import { BrowserWindow, ipcMain } from "electron";



const SetupIPCHandlers = () => {
    ipcMain.on('minimize-window', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            focusedWindow.minimize();
        }
    });
    ipcMain.on('maximize-window', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            if (focusedWindow.isMaximized()) {
                focusedWindow.unmaximize();
            } else {
                focusedWindow.maximize();
            }
        }
    });
    ipcMain.on('close-window', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            focusedWindow.close();
        }
    });
    ipcMain.on('fullscreen-window', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            if (focusedWindow.isFullScreen()) {
                focusedWindow.setFullScreen(false);
            } else {
                focusedWindow.setFullScreen(true);
            }
        }
    });
};

export default SetupIPCHandlers;
