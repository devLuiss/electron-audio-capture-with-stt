"use strict";
const preload = require("@electron-toolkit/preload");
const buffer = require("buffer");
const electron = require("electron");
if (process.contextIsolated) {
  console.log("[Preload] Context Isolation está habilitado. Expondo APIs.");
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("nodeAPI", {
      bufferAlloc: (size) => {
        console.log("[Preload] Chamando bufferAlloc com tamanho:", size);
        return buffer.Buffer.alloc(size);
      },
      writeFile: (path, data) => {
        console.log("[Preload] Chamando writeFile para o caminho:", path);
        return electron.ipcRenderer.invoke("writeFile", path, data);
      },
      platform: process.platform,
      // Expor a plataforma
      // Função para obter o ID da fonte de captura de desktop (para áudio do sistema no Windows)
      getDesktopSourceId: () => electron.ipcRenderer.invoke("get-desktop-source-id")
    });
    console.log("[Preload] APIs expostas com sucesso.");
  } catch (error) {
    console.error("[Preload] Erro ao expor APIs:", error);
  }
} else {
  console.log("[Preload] Context Isolation está desabilitado. Adicionando APIs ao global.");
  window.electron = preload.electronAPI;
  window.api = api;
}
