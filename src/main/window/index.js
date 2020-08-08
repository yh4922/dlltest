import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

/**
 * 创建主窗口
 * @param {BrowserWindow} mainWindow 窗口对象
 */
export function createMainWindow (mainWindow) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  let loadUrl = process.env.WEBPACK_DEV_SERVER_URL
  if (!loadUrl) {
    createProtocol('app')
    loadUrl = 'app://./index.html'
  }
  mainWindow.loadURL(loadUrl)
  if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  mainWindow.webContents.openDevTools()

  return mainWindow
}
