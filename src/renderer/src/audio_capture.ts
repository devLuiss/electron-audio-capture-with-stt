import { Observable } from 'rxjs'

console.log('[AudioCapture] Script loaded') // Log para verificar carregamento

// Interface para dados do worklet (se aplicável, ajuste conforme necessário)
interface AudioWorkletMessageData {
  buffer: Float32Array
}

// Definição do tipo ConstrainDOMStringParameters se não estiver globalmente disponível

class Capturer {
  private audioContext: AudioContext | undefined
  private mediaStreamSource: MediaStreamAudioSourceNode | undefined
  private audioWorkletNode: AudioWorkletNode | undefined
  private inputStream: MediaStream | undefined // Stream obtido via constraints
  private permissionStatus: PermissionStatus | null = null
  private constraints: MediaStreamConstraints // Armazena as constraints

  constructor(constraints: MediaStreamConstraints) {
    console.log('[AudioCapture] Capturer instanciado com constraints:', constraints)
    this.constraints = constraints
  }

  async checkPermissions(): Promise<boolean> {
    try {
      console.log('[AudioCapture] Verificando permissões para microfone...')
      
      if (navigator.permissions && navigator.permissions.query) {
        this.permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        
        console.log(`[AudioCapture] Status da permissão para microfone: ${this.permissionStatus.state}`)
        
        if (this.permissionStatus.state === 'granted') {
          console.log('[AudioCapture] Permissão para microfone já concedida.')
          return true
        }
        
        if (this.permissionStatus.state === 'denied') {
          console.error('[AudioCapture] Permissão para microfone negada pelo usuário.')
          const message = 'O acesso ao microfone foi negado. Por favor, verifique as configurações do seu navegador/sistema e permita o acesso ao microfone.'
          alert(message)
          updateStatus(message)
          return false
        }
      }
      
      console.log('[AudioCapture] Solicitando permissão explicitamente via getUserMedia...')
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      stream.getTracks().forEach(track => track.stop())
      
      console.log('[AudioCapture] Permissão para microfone concedida após solicitação explícita.')
      return true
      
    } catch (error) {
      console.error('[AudioCapture] Erro ao verificar/solicitar permissão para microfone:', error)
      
      let message = 'Não foi possível obter acesso ao microfone. '
      
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          message += 'O acesso foi negado. Por favor, verifique as configurações do seu navegador/sistema.'
        } else if (error.name === 'NotFoundError') {
          message += 'Nenhum dispositivo de áudio foi encontrado. Por favor, conecte um microfone.'
        } else {
          message += `Erro: ${error.name}`
        }
      } else {
        message += 'Verifique se seu sistema permite o acesso ao microfone.'
      }
      
      alert(message)
      updateStatus(message)
      return false
    }
  }

  async startRecording(
    onAudioCallback: (audioData: Float32Array) => void
  ): Promise<void> {
    console.log('[AudioCapture] Iniciando startRecording')
    if (this.audioContext && this.audioContext.state !== 'closed') {
      console.warn('[AudioCapture] AudioContext existente encontrado. Fechando antes de criar um novo.');
      await this.audioContext.close();
    }
    this.audioContext = new AudioContext()
    console.log(`[AudioCapture] Novo AudioContext criado. Sample rate: ${this.audioContext.sampleRate}`)

    try {
      console.log('[AudioCapture] Tentando obter stream de mídia com as constraints fornecidas:', this.constraints)
      this.inputStream = await navigator.mediaDevices.getUserMedia(this.constraints)
      console.log('[AudioCapture] Stream de mídia obtido com sucesso:', this.inputStream)

      if (!this.inputStream || this.inputStream.getAudioTracks().length === 0) {
        console.error('[AudioCapture] Stream obtido não contém faixas de áudio.')
        throw new Error('Stream de áudio não disponível com as constraints fornecidas.')
      }

      this.mediaStreamSource = this.audioContext.createMediaStreamSource(this.inputStream)
      console.log('[AudioCapture] MediaStreamSource criado a partir do stream de entrada.')

      try {
        console.log('[AudioCapture] Tentando adicionar módulo AudioWorklet: src/renderer/src/wave-loopback.js')
        await this.audioContext.audioWorklet.addModule('src/renderer/src/wave-loopback.js')
        console.log('[AudioCapture] Módulo AudioWorklet adicionado com sucesso.')
      } catch (error) {
        console.error('[AudioCapture] Erro ao adicionar módulo AudioWorklet:', error)
        this.stopRecording()
        return
      }

      this.audioWorkletNode = new AudioWorkletNode(this.audioContext, 'wave-processor')
      console.log('[AudioCapture] AudioWorkletNode \'wave-processor\' criado.')

      this.audioWorkletNode.port.onmessage = (event: MessageEvent<AudioWorkletMessageData>) => {
        if (event.data && event.data.buffer) {
          onAudioCallback(event.data.buffer)
        } else {
          console.warn("[AudioCapture] Mensagem inesperada recebida do AudioWorklet:", event.data)
        }
      }
      this.audioWorkletNode.port.onmessageerror = (event) => {
        console.error('[AudioCapture] Erro na mensagem do AudioWorklet port:', event)
      }
      this.audioWorkletNode.onprocessorerror = (event) => {
        console.error('[AudioCapture] Erro no processador AudioWorklet:', event)
      }

      this.mediaStreamSource.connect(this.audioWorkletNode)
      console.log('[AudioCapture] MediaStreamSource conectado ao AudioWorkletNode.')

      console.log('[AudioCapture] Gravação iniciada com sucesso.')
    } catch (error) {
      console.error('[AudioCapture] Erro GERAL durante startRecording:', error)
      let errorMsg = "Erro ao iniciar gravação: "
      if (error instanceof Error) errorMsg += error.message
      else errorMsg += String(error)
      updateStatus(errorMsg)
      this.stopRecording()
      throw error
    }
  }

  stopRecording(): void {
    console.log('[AudioCapture] Iniciando stopRecording')
    this.inputStream?.getTracks().forEach((track) => {
      console.log(`[AudioCapture] Parando track de entrada: ${track.kind} - ${track.label} - ID: ${track.id} - State: ${track.readyState}`)
      track.stop()
      console.log(`[AudioCapture] Track de entrada parada. Novo state: ${track.readyState}`)
    })

    if (this.audioWorkletNode) {
      console.log('[AudioCapture] Desconectando AudioWorkletNode')
      this.audioWorkletNode.disconnect()
      console.log('[AudioCapture] AudioWorkletNode desconectado.')
    } else {
      console.log('[AudioCapture] AudioWorkletNode não encontrado para desconectar.')
    }

    if (this.mediaStreamSource) {
      console.log('[AudioCapture] Desconectando MediaStreamSource')
      this.mediaStreamSource.disconnect()
      console.log('[AudioCapture] MediaStreamSource desconectado.')
    } else {
      console.log('[AudioCapture] MediaStreamSource não encontrado para desconectar.')
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      console.log(`[AudioCapture] Fechando AudioContext (estado atual: ${this.audioContext.state})`)
      this.audioContext.close().then(() => {
        console.log('[AudioCapture] AudioContext fechado com sucesso.')
        this.audioContext = undefined
      }).catch(err => {
        console.error('[AudioCapture] Erro ao fechar AudioContext:', err)
        this.audioContext = undefined
      })
    } else {
      console.log(`[AudioCapture] AudioContext já estava fechado (${this.audioContext?.state}) ou não inicializado.`)
      this.audioContext = undefined
    }

    this.inputStream = undefined
    this.mediaStreamSource = undefined
    this.audioWorkletNode = undefined
    console.log('[AudioCapture] Recursos de gravação limpos.')
  }

  _internal_audio_stream(): Observable<Float32Array> {
    console.log('[AudioCapture] Criando Observable para _internal_audio_stream')
    return new Observable((subscriber) => {
      console.log('[AudioCapture] Observable subscrito. Iniciando gravação...')
      this.startRecording((audioData) => {
        subscriber.next(audioData)
      }).then(() => {
        console.log("[AudioCapture] startRecording concluído (promessa resolvida). Aguardando dados do worklet...")
      }).catch(error => {
        console.error("[AudioCapture] Erro ao iniciar a gravação no Observable:", error)
        subscriber.error(error)
      });

      return () => {
        console.log('[AudioCapture] Observable desinscrito. Parando gravação...')
        this.stopRecording()
        console.log('[AudioCapture] Gravação parada via limpeza do Observable.')
      }
    })
  }
}

function updateStatus(message: string) {
  const statusDiv = document.getElementById('status')
  if (statusDiv) {
    statusDiv.textContent = message
    console.log(`[AudioCapture] Status: ${message}`)
  }
}

export function audio_stream(constraints: MediaStreamConstraints): Observable<Float32Array> {
  const capturer = new Capturer(constraints)
  return capturer._internal_audio_stream()
}