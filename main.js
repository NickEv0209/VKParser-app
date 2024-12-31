const {app, BrowserWindow} = require('electron')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log')
const path = require('path')

log.transports.file.resolvePathFn = () => path.join('C:\Users\FERZ\Desktop\projects\electron-update-app', 'logs/main.log')
log.log('application version = '+ app.getVersion())

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 400,
  });

  win.loadFile(path.join(__dirname, 'index.html'))
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
