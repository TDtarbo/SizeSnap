import { app, BrowserWindow } from "electron";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const isMac = process.platform === 'darwin'
const __dirname = dirname(fileURLToPath(import.meta.url));

const createWindow = () => {
    const win = new BrowserWindow({
        title: "SizeSnap",
        width: 800,
        height: 750,
        frame: false,
        hasShadow: true,
        icon: isMac
            ? path.join(__dirname, "../assets/icon.incs")
            : path.join(__dirname, "../assets/icon.ico"),
    });

    win.loadFile("./src/renderer/index.html");

    //win.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })
