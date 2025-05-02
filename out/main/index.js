"use strict";
const utils = require("@electron-toolkit/utils");
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const icon = path.join(__dirname, "../../resources/icon.png");
electron.ipcMain.handle("writeFile", (_event, path2, data) => {
  console.log("[Main] Iniciando writeFile para o caminho:", path2);
  console.log("writing file to " + path2);
  console.log("[Main] Concluído writeFile para o caminho:", path2);
  return fs.promises.writeFile(path2, data);
});
electron.ipcMain.handle("get-desktop-source-id", async () => {
  console.log("[Main] Recebida solicitação get-desktop-source-id");
  if (process.platform !== "win32") {
    console.warn("[Main] Captura de áudio do sistema via desktopCapturer só é suportada no Windows.");
    return null;
  }
  try {
    const sources = await electron.desktopCapturer.getSources({ types: ["screen"] });
    console.log("[Main] Fontes de captura encontradas:", sources.map((s) => ({ id: s.id, name: s.name })));
    if (sources.length > 0) {
      console.log(`[Main] Retornando sourceId: ${sources[0].id}`);
      return sources[0].id;
    } else {
      console.warn("[Main] Nenhuma fonte de captura do tipo 'screen' encontrada.");
      return null;
    }
  } catch (error) {
    console.error("[Main] Erro ao obter fontes de captura:", error);
    return null;
  }
});
function createWindow() {
  console.log("[Main] Iniciando createWindow");
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
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
  });
  if (process.platform === "linux") {
    console.log("[Main] Configurando permissões específicas para Linux");
    electron.session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
      console.log(`[Main] Solicitação de permissão recebida para: ${permission}`);
      if (permission === "media") {
        console.log("[Main] Permissão de mídia automaticamente aprovada");
        callback(true);
        return;
      }
      callback(false);
    });
  }
  electron.session.defaultSession.setDisplayMediaRequestHandler((_request, callback) => {
    console.log("[Main] Iniciando setDisplayMediaRequestHandler");
    electron.desktopCapturer.getSources({ types: ["window", "screen"] }).then((sources) => {
      console.log("[Main] Fontes de captura de desktop obtidas:", sources);
      callback({ video: sources[0], audio: "loopback" });
      console.log("[Main] Concluído setDisplayMediaRequestHandler");
    });
  });
  mainWindow.on("ready-to-show", () => {
    console.log("[Main] Evento ready-to-show disparado");
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    console.log("[Main] Iniciando setWindowOpenHandler para URL:", details.url);
    electron.shell.openExternal(details.url);
    console.log("[Main] Concluído setWindowOpenHandler");
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  console.log("[Main] Concluído createWindow");
}
electron.app.whenReady().then(() => {
  console.log("[Main] Evento app.whenReady disparado");
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    console.log("[Main] Evento browser-window-created disparado");
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    console.log("[Main] Evento activate disparado");
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      console.log("[Main] Nenhuma janela aberta, criando uma nova.");
      createWindow();
    }
  });
  console.log("[Main] Concluído app.whenReady setup");
});
electron.app.on("window-all-closed", () => {
  console.log("[Main] Evento window-all-closed disparado");
  if (process.platform !== "darwin") {
    console.log("[Main] Encerrando o aplicativo (plataforma não-macOS)");
    electron.app.quit();
  } else {
    console.log("[Main] Não encerrando o aplicativo (plataforma macOS)");
  }
});
