const electron = require('electron')
const path = require('path')
const { GetSourcesSync, GetSourceSync, GetAppConfig, SetAppConfig } = require('./sources');
const md = require('./parsing');

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const ipcMain = electron.ipcMain;
const isDev = process.env.NODE_ENV === "development";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      devTools: true,
      nodeIntegration: true, //是否使用 node
      enableRemoteModule: true, //是否有子页面
      contextIsolation: false, //是否禁止 node
      nodeIntegrationInSubFrames: true, //否允许在子页面(iframe)或子窗口(child window)中集成 Node.js
    }
  })
  if (isDev) {
    win.webContents.openDevTools({ mode: 'right' })
  }
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/index.html`)
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('get-markdown-path', async () => {
    return await GetSourcesSync();
  });

  ipcMain.handle('get-markdown-content', async (e, path) => {
    return md.render(await GetSourceSync(path));
  });

  ipcMain.handle('get-app-config', async () => {
    return await GetAppConfig();
  });

  ipcMain.handle('set-app-config', (e, config) => {
    SetAppConfig(config);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.setName("Little")

Menu.setApplicationMenu(Menu.buildFromTemplate([{
  label: "Little",
  submenu: [{
    label: '设置',
    click: function (e, focusedWindow) {
      focusedWindow.webContents.send("redirect-to-setting");
      console.log("this is setting")
    }
  }]
}])); //取消默认工具栏