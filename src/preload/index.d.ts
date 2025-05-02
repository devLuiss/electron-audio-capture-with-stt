import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    nodeAPI: {
      platform: NodeJS.Platform // Adicionado platform
      writeFile: (filePath: string, data: Uint8Array) => Promise<void>
      getDesktopSourceId: () => Promise<string | null> // Adicionado getDesktopSourceId
      bufferAlloc: (size: number) => Buffer // Adicionado bufferAlloc se ainda for usado
    }
  }
}
