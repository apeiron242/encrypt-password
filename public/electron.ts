import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import * as isDev from "electron-is-dev";
import * as path from "path";
import newPost from "./utils/encrypt";
import decrypt from "./utils/decrypt";
import { dbClose, dbInit } from "./utils/dbConnect";
import deletePost from "./utils/deletePost";

let mainWindow: BrowserWindow;

function sendStatusToWindow(text) {
  mainWindow.webContents.send("message", text);
}

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
app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

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

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});

autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (err) => {
  sendStatusToWindow("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  sendStatusToWindow("Update downloaded");

  const option = {
    type: "question",
    buttons: ["Update", "Cancel"],
    defaultId: 0,
    title: "electron-updater",
    message: "There is a new update. Do you want to download it?",
  };
  let btnIndex = dialog.showMessageBoxSync(mainWindow, option);

  if (btnIndex === 0) {
    autoUpdater.quitAndInstall();
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
