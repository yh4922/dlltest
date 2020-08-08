'use strict'

import { app, protocol, ipcMain } from 'electron'
import { createMainWindow } from './window/index'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow, tpWindow

// 注册APP协议
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 当所以的渲染进程全部关闭后 退出主进程
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 当应用程序退出前触发
app.on('before-quit', () => {
  console.log('应用程序退出前')
})

// 当应用程序被激活时如果窗口不存在则创建窗口
app.on('activate', () => {
  // 如果主窗口不存在则创建
  if (!mainWindow) mainWindow = createMainWindow(mainWindow)
})

// 当应用程序准备完成后 开始创建窗口
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  mainWindow = createMainWindow(mainWindow)
  mainWindow.on('closed', () => {
    app.quit()
  })
})

// 渲染进程事件转发
ipcMain.on('render-event', function (event, { win, eventName, eventData }) {
  if (win === 'mainWindow') {
    mainWindow && mainWindow.webContents.send(eventName, eventData)
  } else if (win === 'tpWindow') {
    tpWindow && tpWindow.webContents.send(eventName, eventData)
  }
})


// 在开发模式下，应父进程的请求干净退出。 
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else { 
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
