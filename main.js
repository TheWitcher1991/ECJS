'use strict'

if (require.main !== module) {
    require('update-electron-app')({
        logger: require('electron-log')
    })
}

const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
//const log = require('electron-log');

const pjson = require('./package.json')
const ipc = ipcMain

//log.transports.console.level = 'info';
//log.transports.file.level = 'info';
//log.info('App starting...');
const appversion = pjson.version;

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('ECJS')

let mainWindow = null

const sendStatusToWindow = (text, ver) => {
    log.info(text)
    mainWindow.webContents.send('message', text, ver)
}

function createWindow () {
    const windowOptions = {
        width: 636,
        height: 440,
        center: true,
        title: 'ECJS',
        // transparent: true,
        frame: false,
        hasShadow: false,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, './app/img/icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, './electron/preload.js')
        }
    }

    if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, './app/img/icon.ico')
    }
    
    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.setMenuBarVisibility(false)
    mainWindow.setProgressBar(0.5)
    // mainWindow.webContents.openDevTools()
    mainWindow.loadURL(path.join('file://', __dirname, '/app/index.html'))
    // mainWindow.loadURL('http://localhost:8000/')

    // log.info(mainWindow);

    if (debug) {
        mainWindow.webContents.openDevTools()
        mainWindow.maximize()
        require('devtron').install()
    }

    mainWindow.on('closed', () => mainWindow = null)
}

/* autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...', appversion);
})

autoUpdater.on('update-available', info => {
    sendStatusToWindow('Update available.', appversion);
})

autoUpdater.on('update-not-available', info => {
    sendStatusToWindow('Update not available.', appversion);
})

autoUpdater.on('error', err => {
    sendStatusToWindow('Error in auto-updater. ' + err, appversion);
})

autoUpdater.on('download-progress', progressObj => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message, appversion);
})

autoUpdater.on('update-downloaded', info => {
    setTimeout(function () {
        sendStatusToWindow('Update downloaded..Restarting App in 5 seconds', appversion);
        homePageWindow.webContents.send('updateReady');
        autoUpdater.quitAndInstall();
    }, 5000)
}); */

app.whenReady().then(() => {
    // autoUpdater.checkForUpdatesAndNotify()
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})