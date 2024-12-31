const {app, BrowserWindow} = require('electron')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log')
const path = require('path')

log.transports.file.resolvePathFn = () => path.join(__dirname, 'logs/main.log')
log.info('hello, log')
log.warn('Some problem appears')

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 400,
  });

  win.loadFile(path.join(__dirname, 'index.html'))
};

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('update-available', () => {
  log.info('update-available')
})

autoUpdater.on('checking-for-update', () => {
  log.info('checking-for-update')
})

autoUpdater.on('download-progress', () => {
  log.info('download-progress')
})

autoUpdater.on('update-downloaded', () => {
  log.info('update-downloaded')
})

autoUpdater.on('update-not-available', () => {
  log.info('update-not-available')
})
