const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("api", {
    openFilePicker: () => ipcRenderer.invoke("dialog:fileInput"),
    openDirPicker: () => ipcRenderer.invoke("dialog:dirInput"),
    resizeImage: (data) => ipcRenderer.invoke("imageResizer:resize", data),
    defaultOutputDir: () => ipcRenderer.invoke("default:outputDir"),
    windowClose: () => ipcRenderer.send("window:close"),
    windowMinimize: () => ipcRenderer.send("window:minimize"),
    windowMaximize: () => ipcRenderer.send("window:maximize"),
});
