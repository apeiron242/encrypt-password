import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import newPost from "./utils/encrypt";
import decrypt from "./utils/decrypt";
import { dbClose, dbInit } from "./utils/dbConnect";
import deletePost from "./utils/deletePost";

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    center: true,
    kiosk: false,
    resizable: true,
    fullscreen: false,
    fullscreenable: true,
    icon: path.join(__dirname, "build", "assets", "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  dbInit();

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);

  // Emitted when the window is closed.
  mainWindow.on("closed", () => (mainWindow = undefined!));
  mainWindow.focus();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", async () => {
  await dbClose();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("encrypt", async (e, data) => {
  try {
    const result = await newPost(data);
    return result;
  } catch (e) {
    return e;
  }
});

ipcMain.handle("decrypt", async (e, password) => {
  try {
    const result = await decrypt(password);
    if (!result) return "no data";
    return result;
  } catch (e) {
    return e;
  }
});

ipcMain.handle("delete", async (e, id) => {
  try {
    await deletePost(id);
    return "ok";
  } catch (e) {
    return e;
  }
});
