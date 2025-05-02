import { electronAPI } from '@electron-toolkit/preload'
import { Buffer } from 'buffer'
import { contextBridge, ipcRenderer } from 'electron'

// Whitelist of channels
const ipc = {
  render: {
    // From render to main.
    send: [],
    // From main to render.
    receive: [],
    // From render to main and back again.
    sendReceive: ['writeFile', 'get-desktop-source-id'] // Adicionado 'get-desktop-source-id'
  }
}

// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  console.log('[Preload] Context Isolation está habilitado. Expondo APIs.')
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('nodeAPI', {
      bufferAlloc: (size: number) => {
        console.log('[Preload] Chamando bufferAlloc com tamanho:', size)
        return Buffer.alloc(size)
      },
      writeFile: (path: string, data: Uint8Array) => {
        console.log('[Preload] Chamando writeFile para o caminho:', path)
        return ipcRenderer.invoke('writeFile', path, data)
      },
      platform: process.platform, // Expor a plataforma
      // Função para obter o ID da fonte de captura de desktop (para áudio do sistema no Windows)
      getDesktopSourceId: (): Promise<string | null> => 
        ipcRenderer.invoke('get-desktop-source-id')
    })
    console.log('[Preload] APIs expostas com sucesso.')
  } catch (error) {
    console.error('[Preload] Erro ao expor APIs:', error)
  }
} else {
  console.log('[Preload] Context Isolation está desabilitado. Adicionando APIs ao global.')
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
