import { Subject, takeUntil } from 'rxjs'; // Revertido para importar takeUntil de 'rxjs'
import { audio_stream } from './audio_capture'
import { renderWavFile } from './wav'

console.log('[Renderer] Script loaded')

let chunks: Float32Array[] = []
let stopSignal = new Subject<void>()
let isRecording = false
let audioStreamSubscription: any = null

const startButton = document.getElementById('startButton')
const stopButton = document.getElementById('stopButton')
const statusDiv = document.getElementById('status')
const audioSourceRadios = document.querySelectorAll<HTMLInputElement>('input[name="audioSource"]')

// Adiciona estilos básicos para melhor usabilidade
if (document.head) {
  const style = document.createElement('style')
  style.textContent = `
    body { font-family: Arial, sans-serif; padding: 20px; }
    .button { padding: 10px 20px; margin: 5px; cursor: pointer; }
    #status { margin-top: 15px; padding: 10px; background: #f0f0f0; }
    #startButton { background: #4CAF50; color: white; border: none; }
    #stopButton { background: #f44336; color: white; border: none; }
    .disabled { opacity: 0.5; cursor: not-allowed; }
  `
  document.head.appendChild(style)
}

function updateStatus(message: string) {
  if (statusDiv) {
    statusDiv.textContent = message
    console.log(`[Renderer] Status: ${message}`)
  } else {
    console.error('[Renderer] Elemento statusDiv não encontrado!')
  }
}

// Função para atualizar a UI baseada no estado de gravação
function updateUIState(recording: boolean) {
  isRecording = recording
  
  if (startButton && stopButton) {
    // Habilita/desabilita os botões conforme o estado
    if (recording) {
      startButton.classList.add('disabled')
      stopButton.classList.remove('disabled')
    } else {
      startButton.classList.remove('disabled')
      stopButton.classList.add('disabled')
    }
  }
  
  // Desabilita a seleção de fonte durante a gravação
  audioSourceRadios.forEach(radio => {
    radio.disabled = recording
  })

  console.log(`[Renderer] Estado da UI atualizado: isRecording=${isRecording}`)
}

// Função para obter a fonte de áudio selecionada
function getSelectedAudioSource(): 'microphone' | 'system' {
  let selectedValue: 'microphone' | 'system' = 'microphone' // Padrão
  audioSourceRadios.forEach(radio => {
    if (radio.checked) {
      selectedValue = radio.value as 'microphone' | 'system'
    }
  })
  console.log(`[Renderer] Fonte de áudio selecionada: ${selectedValue}`)
  return selectedValue
}

// Função para obter as constraints de mídia corretas
async function getMediaConstraints(): Promise<MediaStreamConstraints | null> {
  const source = getSelectedAudioSource()
  const platform = window.nodeAPI.platform

  if (source === 'microphone') {
    console.log('[Renderer] Usando constraints para microfone.')
    return { audio: true, video: false }
  }

  if (source === 'system') {
    console.log(`[Renderer] Tentando obter constraints para áudio do sistema na plataforma: ${platform}`) 
    if (platform === 'win32') {
      updateStatus('Obtendo fonte de captura de desktop (Windows)...')
      try {
        const sourceId = await window.nodeAPI.getDesktopSourceId()
        if (sourceId) {
          console.log(`[Renderer] Usando sourceId ${sourceId} para áudio do sistema (Windows).`)
          return {
            audio: {
              // @ts-ignore // Electron/Chromium specific constraint
              mandatory: {
                chromeMediaSource: 'desktop'
                // chromeMediaSourceId: sourceId // Áudio não precisa de sourceId
              }
            },
            video: {
              // @ts-ignore // Electron/Chromium specific constraint
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sourceId
              }
            }
          }
        } else {
          updateStatus('Erro: Não foi possível obter a fonte de captura de desktop no Windows.')
          console.error('[Renderer] getDesktopSourceId retornou null no Windows.')
          return null
        }
      } catch (error) {
        updateStatus(`Erro ao obter fonte de captura no Windows: ${error}`)
        console.error('[Renderer] Erro ao chamar getDesktopSourceId:', error)
        return null
      }
    } else if (platform === 'darwin') { // macOS
      updateStatus('Captura de áudio do sistema no macOS requer configuração manual (ex: BlackHole/Soundflower) ou bibliotecas/SDKs específicos. Veja o README.')
      console.warn('[Renderer] Captura de áudio do sistema não suportada nativamente no macOS via desktopCapturer.')
      return null
    } else { // Linux e outros
      updateStatus('Captura de áudio do sistema no Linux requer configuração manual (ex: PulseAudio loopback) ou ferramentas externas (ex: FFmpeg). Veja o README.')
      console.warn('[Renderer] Captura de áudio do sistema não suportada nativamente no Linux via desktopCapturer.')
      return null
    }
  }
  return null // Caso inesperado
}

// Função para verificar permissões (agora verifica apenas microfone)
async function checkMicrophonePermission(): Promise<boolean> {
  updateStatus('Verificando permissões do microfone...')
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach(track => track.stop())
    console.log('[Renderer] Permissão para microfone verificada.')
    updateStatus('Pronto para gravar.')
    return true
  } catch (error) {
    console.error('[Renderer] Erro ao verificar permissão do microfone:', error)
    let message = 'Erro ao acessar o microfone: '
    if (error instanceof DOMException) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        message += 'Permissão negada. Verifique suas configurações do sistema.'
      } else if (error.name === 'NotFoundError') {
        message += 'Nenhum dispositivo de áudio encontrado.'
      } else {
        message += `${error.name}`
      }
    } else {
      message += 'Erro desconhecido.'
    }
    updateStatus(message)
    setTimeout(() => alert(message), 500)
    return false
  }
}

// Verifica permissões ao carregar
document.addEventListener('DOMContentLoaded', () => {
  console.log('[Renderer] DOM carregado, verificando permissões de microfone')
  checkMicrophonePermission().then(granted => {
    updateUIState(false) // Garante estado inicial correto
    if (!granted && startButton) {
        startButton.classList.add('disabled') // Desabilita start se não houver permissão
    }
  })
})

if (startButton) {
  startButton.addEventListener('click', async () => {
    console.log('[Renderer] Botão Start clicado!')
    if (isRecording) return

    const selectedSource = getSelectedAudioSource()
    
    // Se for microfone, verifica permissão primeiro
    if (selectedSource === 'microphone') {
        const hasPermission = await checkMicrophonePermission()
        if (!hasPermission) {
            updateStatus('Permissão de microfone necessária para iniciar a gravação.')
            return
        }
    }

    updateStatus('Obtendo configurações de mídia...')
    const constraints = await getMediaConstraints()

    if (!constraints) {
      console.error('[Renderer] Não foi possível obter as constraints de mídia.')
      // A mensagem de erro específica já foi definida em getMediaConstraints
      updateUIState(false)
      return
    }

    updateUIState(true)
    updateStatus('Iniciando gravação...')
    chunks = []
    stopSignal = new Subject<void>()

    try {
      console.log('[Renderer] Criando nova inscrição no stream de áudio com constraints:', constraints)
      // Passa as constraints corretas para audio_stream
      const audioStream = audio_stream(constraints).pipe(takeUntil(stopSignal))

      audioStreamSubscription = audioStream.subscribe({
        next: (chunk) => {
          console.log('[Renderer] Recebido chunk de áudio de tamanho:', chunk.length)
          chunks.push(chunk)
        },
        error: (err) => {
          console.error('[Renderer] Erro no stream de áudio:', err)
          let errorMsg = 'Erro durante a gravação: '
          if (err instanceof DOMException) {
            errorMsg += `${err.name} - ${err.message}`
          } else if (err instanceof Error) {
            errorMsg += err.message
          } else {
            errorMsg += String(err)
          }
          updateStatus(errorMsg)
          updateUIState(false)
          audioStreamSubscription = null
        },
        complete: () => {
          console.log('[Renderer] Stream de áudio completado (via takeUntil).')
          // Não processa aqui, espera o botão Stop
          // processAndSaveAudio()
          // updateUIState(false)
          audioStreamSubscription = null
        }
      })

      console.log('[Renderer] Inscrição no stream de áudio criada:', audioStreamSubscription)
      updateStatus(`Gravação iniciada (${selectedSource === 'microphone' ? 'Microfone' : 'Áudio do Sistema'}).`)
    } catch (error) {
      console.error('[Renderer] Erro ao criar stream de áudio:', error)
      updateStatus(`Erro ao iniciar gravação: ${error instanceof Error ? error.message : String(error)}`)
      updateUIState(false)
    }
  })
}

if (stopButton) {
  stopButton.addEventListener('click', () => {
    console.log('[Renderer] Botão Stop clicado!')
    
    if (!isRecording) {
      console.log('[Renderer] Não está gravando, ignorando clique em Stop')
      updateStatus('Nenhuma gravação em andamento para parar.')
      return
    }
    
    console.log('[Renderer] Botão Stop clicado, parando gravação...')
    updateStatus('Parando gravação...')
    
    try {
      // Armazena uma referência temporária e reseta a variável global imediatamente
      // para evitar condições de corrida
      const subscription = audioStreamSubscription
      audioStreamSubscription = null
      
      // Verifica se há uma inscrição ativa antes de tentar cancelá-la
      if (subscription) {
        console.log('[Renderer] Cancelando inscrição de stream de áudio')
        
        // Termina o stream de áudio usando o stopSignal
        console.log('[Renderer] Enviando sinal de parada para o stream via stopSignal.next()')
        stopSignal.next()
        stopSignal.complete()
        
        // Tenta cancelar a inscrição diretamente com tratamento de erro adequado
        try {
          console.log('[Renderer] Tentando cancelar inscrição diretamente')
          subscription.unsubscribe()
          console.log('[Renderer] Inscrição do stream de áudio cancelada via unsubscribe()')
        } catch (unsubError) {
          console.warn('[Renderer] Erro ao cancelar inscrição:', unsubError)
        }
      } else {
        console.warn('[Renderer] Nenhuma inscrição de stream encontrada para cancelar')
      }
      
      // Processa o áudio imediatamente
      console.log('[Renderer] Processando o áudio após parar a gravação')
      
      if (chunks.length > 0) {
        console.log(`[Renderer] ${chunks.length} chunks capturados, processando áudio`)
        // Processa e salva o áudio gravado
        processAndSaveAudio()
      } else {
        console.warn('[Renderer] Nenhum dado de áudio capturado durante a gravação')
        updateStatus('Nenhum áudio capturado para salvar.')
      }
      
    } catch (error) {
      console.error('[Renderer] Erro ao processar o clique do botão Stop:', error)
      updateStatus('Erro ao parar a gravação: ' + String(error))
    } finally {
      // Garante que o estado seja atualizado mesmo em caso de erro
      console.log('[Renderer] Finalizando estado de gravação')
      updateUIState(false)
    }
  })
}

function processAndSaveAudio() {
  if (chunks.length === 0) {
    updateStatus('Nenhum áudio capturado para salvar.')
    console.warn('[Renderer] Nenhum chunk de áudio para processar.')
    return
  }

  console.log(`[Renderer] Processando ${chunks.length} chunks de áudio.`)

  let totalLength = 0
  for (const chunk of chunks) {
    totalLength += chunk.length
  }
  console.log(`[Renderer] Tamanho total do áudio: ${totalLength} samples.`)

  const combinedAudio = new Float32Array(totalLength)

  let offset = 0
  for (const chunk of chunks) {
    combinedAudio.set(chunk, offset)
    offset += chunk.length
  }
  console.log('[Renderer] Chunks de áudio combinados.')

  try {
    // Corrigido: Adicionando o parâmetro 'options' obrigatório
    const wavBytes = renderWavFile(combinedAudio, { isFloat: false })
    console.log(`[Renderer] Arquivo WAV renderizado (tamanho: ${wavBytes.byteLength} bytes)`)

    // Corrigido: Convertendo Uint8Array para Blob
    const wavBlob = new Blob([wavBytes], { type: 'audio/wav' })
    console.log(`[Renderer] Blob WAV criado (tamanho: ${wavBlob.size} bytes)`)

    const reader = new FileReader()
    reader.onload = function (event) {
      if (event.target?.result instanceof ArrayBuffer) {
        const buffer = Buffer.from(event.target.result)
        console.log(`[Renderer] Enviando buffer (size: ${buffer.length}) para o processo principal para salvar...`)
        window.nodeAPI
          .writeFile('out.wav', buffer)
          .then(() => {
            updateStatus('Arquivo out.wav salvo com sucesso!')
            console.log('[Renderer] Arquivo salvo com sucesso via processo principal.')
          })
          .catch((err) => {
            console.error('[Renderer] Erro ao salvar arquivo via processo principal:', err)
            updateStatus(`Erro ao salvar arquivo: ${err.message}`)
          })
      } else {
        console.error("[Renderer] Resultado do FileReader não é um ArrayBuffer.")
        updateStatus("Erro interno ao ler o Blob WAV.")
      }
    }
    reader.onerror = (event) => {
      console.error("[Renderer] Erro do FileReader ao ler o Blob WAV:", event.target?.error)
      updateStatus("Erro interno ao ler o Blob WAV.")
    }
    reader.readAsArrayBuffer(wavBlob)
  } catch (error) {
    console.error('[Renderer] Erro ao renderizar ou salvar o arquivo WAV:', error)
    // Corrigido: Tratando error como unknown
    const errorMessage = error instanceof Error ? error.message : String(error)
    updateStatus(`Erro ao processar WAV: ${errorMessage}`)
  } finally {
    chunks = []
  }
}

if (window.nodeAPI && typeof window.nodeAPI.writeFile === 'function') {
  console.log('[Renderer] API nodeAPI.writeFile encontrada.')
} else {
  console.error('[Renderer] ERRO: API nodeAPI.writeFile NÃO encontrada. Verifique preload/index.ts e o contexto da janela.')
  updateStatus('Erro de configuração: API de salvamento indisponível.')
}

// Verifica se a API getDesktopSourceId está disponível
if (window.nodeAPI && typeof window.nodeAPI.getDesktopSourceId === 'function') {
  console.log('[Renderer] API nodeAPI.getDesktopSourceId encontrada.')
} else {
  console.error('[Renderer] ERRO: API nodeAPI.getDesktopSourceId NÃO encontrada. Verifique preload/index.ts.')
  updateStatus('Erro de configuração: API de captura de sistema indisponível.')
}
