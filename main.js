'use strict'

if (require.main !== module) {
    require('update-electron-app')({
        logger: require('electron-log')
    })
}

const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const log = require('electron-log');
const ipc = ipcMain

log.transports.console.level = 'info';
log.transports.file.level = 'info';

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('ECJS')

let mainWindow = null


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
            preload: path.join(__dirname, './electron/preload.js')
        }
    }

    if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, './app/img/icon.ico')
    }
    
    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.setMenuBarVisibility(false)
    mainWindow.setProgressBar(0.5)
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(path.join('file://', __dirname, '/app/index.html'))

    log.info(mainWindow);

    if (debug) {
        mainWindow.webContents.openDevTools()
        mainWindow.maximize()
        require('devtron').install()
    }

    mainWindow.on('closed', () => mainWindow = null)
}

app.whenReady().then(() => {
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