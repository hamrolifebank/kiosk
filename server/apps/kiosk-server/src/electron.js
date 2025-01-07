var import_electron = require("electron");
var import_server = require("./server");
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT) : 3e3;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let mainWindow;
async function createWindow() {
  mainWindow = new import_electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  await sleep(1e3);
  mainWindow.loadURL(`http://${hostname}:${port}`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
import_electron.app.on("ready", createWindow);
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron.app.quit();
  }
});
import_electron.app.on("activate", () => {
  if (import_electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//# sourceMappingURL=electron.js.map
