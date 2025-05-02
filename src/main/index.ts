import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, desktopCapturer, ipcMain, session, shell } from 'electron'
import { promises as fs } from 'fs'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

ipcMain.handle('writeFile', (_event, path, data): Promise<void> => {
  console.log('[Main] Iniciando writeFile para o caminho:', path)
  console.log('writing file to ' + path)
  console.log('[Main] Concluído writeFile para o caminho:', path)
  return fs.writeFile(path, data)
})

// Handler para obter o ID da fonte de captura de desktop (tela inteira)
ipcMain.handle('get-desktop-source-id', async (): Promise<string | null> => {
  console.log('[Main] Recebida solicitação get-desktop-source-id')
  if (process.platform !== 'win32') {
    console.warn('[Main] Captura de áudio do sistema via desktopCapturer só é suportada no Windows.')
    return null // Ou lançar um erro específico?
  }
  try {
    const sources = await desktopCapturer.getSources({ types: ['screen'] })
    console.log('[Main] Fontes de captura encontradas:', sources.map(s => ({ id: s.id, name: s.name })))
    // Tenta encontrar a fonte correspondente à tela inteira (pode precisar de lógica mais robusta)
    // Por simplicidade, vamos pegar a primeira fonte de 'screen'
    if (sources.length > 0) {
      console.log(`[Main] Retornando sourceId: ${sources[0].id}`) 
      return sources[0].id
    } else {
      // Corrigido: Usando aspas duplas para a string externa
      console.warn("[Main] Nenhuma fonte de captura do tipo 'screen' encontrada.")
      return null
    }
  } catch (error) {
    console.error('[Main] Erro ao obter fontes de captura:', error)
    return null
  }
})

function createWindow(): void {
  console.log('[Main] Iniciando createWindow')
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // Garantindo permissões para áudio
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true, 
      // Adicionando configurações específicas para Linux que podem ajudar com permissões
      enableWebSQL: false,
      allowRunningInsecureContent: false 
      // Removidas enableBlinkFeatures e disableBlinkFeatures
    }
  })

  // Configuração específica para permissões no Linux
  if (process.platform === 'linux') {
    console.log('[Main] Configurando permissões específicas para Linux')
    // Permitir explicitamente solicitações de mídia no Linux
    session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
      console.log(`[Main] Solicitação de permissão recebida para: ${permission}`)
      
      // Aceitar automaticamente permissões de mídia
      if (permission === 'media') {
        console.log('[Main] Permissão de mídia automaticamente aprovada')
        callback(true)
        return
      }
      
      // Para outras permissões, mostramos diálogo
      callback(false)
    })
  }

  session.defaultSession.setDisplayMediaRequestHandler((_request, callback) => {
    console.log('[Main] Iniciando setDisplayMediaRequestHandler')
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then((sources) => {
      console.log('[Main] Fontes de captura de desktop obtidas:', sources)
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: 'loopback' })
      console.log('[Main] Concluído setDisplayMediaRequestHandler')
    })
  })

  mainWindow.on('ready-to-show', () => {
    console.log('[Main] Evento ready-to-show disparado')
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    console.log('[Main] Iniciando setWindowOpenHandler para URL:', details.url)
    shell.openExternal(details.url)
    console.log('[Main] Concluído setWindowOpenHandler')
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  console.log('[Main] Concluído createWindow')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('[Main] Evento app.whenReady disparado')
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    console.log('[Main] Evento browser-window-created disparado')
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    console.log('[Main] Evento activate disparado')
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log('[Main] Nenhuma janela aberta, criando uma nova.')
      createWindow()
    }
  })
  console.log('[Main] Concluído app.whenReady setup')
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('[Main] Evento window-all-closed disparado')
  if (process.platform !== 'darwin') {
    console.log('[Main] Encerrando o aplicativo (plataforma não-macOS)')
    app.quit()
  } else {
    console.log('[Main] Não encerrando o aplicativo (plataforma macOS)')
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
