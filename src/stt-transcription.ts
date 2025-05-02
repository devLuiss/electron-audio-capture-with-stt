import { InvokeEndpointCommand, SageMakerRuntimeClient } from "@aws-sdk/client-sagemaker-runtime";
import { fromIni } from "@aws-sdk/credential-providers";
import { NodeHttpHandler } from '@aws-sdk/node-http-handler'; // Import necessário
import * as fs from 'fs';
import { Agent } from 'https';
 
console.log('[STT] Iniciando script stt-transcription.ts')

// Define the local WAV file path
const localWavFilePath = 'out.wav';
const endpointName = 'dlsg-ds-asr-real-time-djl-2-endpoint';
 
// Read the WAV file from the local file system
let testData: Buffer;
try {
  console.log(`[STT] Lendo arquivo WAV de: ${localWavFilePath}`)
  testData = fs.readFileSync(localWavFilePath);
  console.log(`[STT] Arquivo WAV lido com sucesso (${testData.length} bytes).`)
} catch (error) {
  console.error(`[STT] Erro ao ler o arquivo WAV: ${localWavFilePath}`, error)
  process.exit(1); // Encerra o script se não conseguir ler o arquivo
}
 
// Define content type and accept type
const contentType = 'audio/wav';
const acceptType = 'application/json';
 
// Set up AWS credentials and region using the default credential provider chain
console.log('[STT] Configurando cliente SageMakerRuntimeClient')
const client = new SageMakerRuntimeClient({
  region: 'us-east-1', // Replace with your region
  credentials: fromIni({ profile: 'default' }),
  requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent({
      rejectUnauthorized: false // CUIDADO: Isso desabilita a verificação do certificado SSL. Use apenas para desenvolvimento/teste.
    })
  })
});
console.log('[STT] Cliente SageMakerRuntimeClient configurado.')
 
const params = {
  EndpointName: endpointName,
  Body: testData,
  ContentType: contentType,
  Accept: acceptType,
};
 
const command = new InvokeEndpointCommand(params);
 
const startTime = Date.now();
console.log(`[STT] Enviando requisição para o endpoint ${endpointName} às: ${new Date(startTime).toISOString()}`);
 
client.send(command).then(
  (data) => {
    const endTime = Date.now();
    console.log(`[STT] Requisição concluída com sucesso às: ${new Date(endTime).toISOString()}`);
    console.log(`[STT] Duração: ${endTime - startTime} ms`);
 
    const output = data.Body;
    if (!output) {
      console.error('[STT] Resposta do endpoint não contém corpo (Body).')
      return;
    }
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(output);
    console.log('[STT] Resposta bruta (string): ', jsonString);
    try {
      const jsonObject = JSON.parse(jsonString);
      console.log('[STT] Resposta JSON parseada: ', jsonObject);
    } catch (parseError) {
      console.error('[STT] Erro ao parsear a resposta JSON:', parseError);
    }
  },
  (error) => {
    const endTime = Date.now();
    console.log(`[STT] Requisição falhou às: ${new Date(endTime).toISOString()}`);
    console.log(`[STT] Duração: ${endTime - startTime} ms`);
    console.error('[STT] Erro ao invocar o endpoint:', error);
  }
);