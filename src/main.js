const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");

const resizeImg = require("resize-img");

const isMac = process.platform === "darwin";

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: "SizeSnap",
        width: 800,
        height: 750,
        resizable: false,
        frame: false,
        hasShadow: true,
        icon: isMac
            ? path.join(__dirname, "../assets/icon.incs")
            : path.join(__dirname, "../assets/icon.ico"),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile("./src/renderer/index.html");
};

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});

ipcMain.handle("dialog:fileInput", async () => {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: "Select an Image File",
            filters: [{ name: "Images", extensions: ["jpg", "png", "bmp"] }],
            properties: ["openFile"],
        });

        if (result.canceled) {
            return null;
        }
        imgPath = result.filePaths[0];
        return imgPath;
    } catch (error) {
        return null;
    }
});

ipcMain.handle("dialog:dirInput", async () => {
    try {
        const result = await dialog.showOpenDialog({
            properties: ["openDirectory"],
        });
        if (result.canceled) {
            return null;
        }
        return result.filePaths[0];
    } catch (error) {
        return null;
    }
});

ipcMain.handle("imageResizer:resize", async (e, options) => {
    return resizeImage(options);
});

ipcMain.handle("default:outputDir", () => {
    return getDefaultPath();
});

const getDefaultPath = () => {
    return path.join(os.homedir(), "Downloads");
};

const resizeImage = async (options) => {
    try {
        const newPath = await resizeImg(fs.readFileSync(options.path), {
            width: parseInt(options.width),
            height: parseInt(options.height),
            format: options.format,
        });
        const fileName = path.basename(options.path);
        let splitedFilename = fileName.split(".");
        const updatedFileName = `${splitedFilename[0]}-${options.width}x${options.height}-resized.${options.format}`;

        if (!fs.existsSync(options.output)) {
            fs.mkdirSync(options.output);
        }
        fs.writeFileSync(path.join(options.output, updatedFileName), newPath);
        shell.openPath(options.output);
        return ["success"];
    } catch (error) {
        return ["error"];
    }
};

ipcMain.on("window:close", () => {
    app.quit();
});

ipcMain.on("window:minimize", () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on("window:maximize", () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    }
});
