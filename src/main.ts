import { app, BrowserWindow, nativeImage, screen, Tray } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import SetupIPCHandlers from './MainProcess/SetupIPCHandlers';
import logo from './assets/logo.png'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
let mainWindow: BrowserWindow | null = null;
let trayWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 690,
    minWidth: 1050,
    minHeight: 690,
    // alwaysOnTop: true,
    frame: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  SetupIPCHandlers();

  mainWindow.on('maximize', () => {
    console.log(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.send('window-maximized');
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });
  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('window-fullscreen');
  });
  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('window-unfullscreen');
  });
  mainWindow.hookWindowMessage(0x0117, function (e) {
    // 0x0117是WM_INITMENUPOPUP消息
    mainWindow.setEnabled(false)
    setTimeout(() => mainWindow.setEnabled(true), 10)
    return true
  })
};

const createTrayMenuWindow = () => {
  // 如果窗口已存在且可见，则聚焦
  if (trayWindow && !trayWindow.isDestroyed()) {
    if (trayWindow.isVisible()) {
      trayWindow.focus();
      return;
    } else {
      // 如果窗口存在但隐藏，重新显示并更新位置
      const mousePos = screen.getCursorScreenPoint();
      const windowWidth = 200;
      const windowHeight = 370;
      const windowX = mousePos.x;
      const windowY = mousePos.y - windowHeight;

      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
      const { x: screenX, y: screenY } = primaryDisplay.workArea;

      let adjustedX = Math.max(screenX, Math.min(windowX, screenX + screenWidth - windowWidth));
      let adjustedY = Math.max(screenY, Math.min(windowY, screenY + screenHeight - windowHeight));

      trayWindow.setSize(windowWidth, windowHeight);
      trayWindow.setPosition(adjustedX, adjustedY);
      trayWindow.webContents.send('tray-show');
      setTimeout(() => {
        trayWindow.show();
        trayWindow.focus();
      }, 100);
      return;
    }
  }

  // 获取鼠标位置
  const mousePos = screen.getCursorScreenPoint();

  // 窗口尺寸
  const windowWidth = 200;
  const windowHeight = 370;

  // 计算窗口位置，使窗口的左下角与鼠标位置对齐
  const windowX = mousePos.x;
  const windowY = mousePos.y - windowHeight;

  // 获取屏幕边界，确保窗口不会超出屏幕
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  const { x: screenX, y: screenY } = primaryDisplay.workArea;

  // 调整窗口位置，确保完全在屏幕内
  let adjustedX = Math.max(screenX, Math.min(windowX, screenX + screenWidth - windowWidth));
  let adjustedY = Math.max(screenY, Math.min(windowY, screenY + screenHeight - windowHeight));

  trayWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: adjustedX,
    y: adjustedY,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: null,
    parent: mainWindow,
    modal: false,
    show: false,
    resizable: false, // 禁止调整大小，保持固定尺寸
    frame: false,
    alwaysOnTop: true // 保持在最前面
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    trayWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + '/#/tray');
  } else {
    trayWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html/#/tray`));
  }

  trayWindow.once('ready-to-show', () => {
    trayWindow.show();
    trayWindow.focus();
  });

  // 当第二个窗口失去焦点时隐藏窗口
  trayWindow.on('blur', () => {
    if (trayWindow) {
      trayWindow.hide();
    }
  });

  trayWindow.on('closed', () => {
    trayWindow = null;
  });
};

const createTray = () => {
  const icon = nativeImage.createFromDataURL(logo);

  const tray = new Tray(icon);
  tray.setToolTip('QQ Music Clone');
  // 右键点击托盘图标打开第二个窗口
  tray.on('right-click', () => {
    createTrayMenuWindow();
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  createTray();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
