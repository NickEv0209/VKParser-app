const {app, BrowserWindow} = require('electron')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log')
const path = require('path')

log.transports.file.resolvePathFn = () => path.join(__dirname, 'logs/main.log')
log.log('application version = '+ app.getVersion())

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1400,
    minHeight: 850,
    icon: path.join(__dirname, "/img/VKP.ico"),
    webPreferences: {
      preload: path.join(__dirname, "/Parser.js"),
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setTitle("VKParser");

  win.loadFile(path.join(__dirname, 'app', 'index.html'))

  win.webContents.openDevTools();

  win.on("close", () => {
    win = null;
  });
};

autoUpdater.on('checking-for-update', () => {
  log.info('checking-for-update...')
})

autoUpdater.on('update-available', (info) => {
  log.info('update-available')
})

autoUpdater.on('update-not-available', (info) => {
  log.info('update-not-available')
})

autoUpdater.on('error', (err) => {
  log.info('error in auto-updater. ' + err)
})

autoUpdater.on('download-progress', (progressTrack) => {
  log.info("\n\ndownload-progress")
  log.info(progressTrack)
})

autoUpdater.on('update-downloaded', (info) => {
  log.info('update-downloaded')
})

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})
