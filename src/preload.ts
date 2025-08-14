// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('NativeAPI', {
    ping: ()=>ipcRenderer.invoke('ping'),
    quit: () => ipcRenderer.send('quit'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeMainWindow: () => ipcRenderer.send('close-main-window'),
    // fullscreenWindow: () => ipcRenderer.send('fullscreen-window'),
    addFiles: () => ipcRenderer.invoke('add-files'),
    getWindowPos: () => ipcRenderer.sendSync('get-window-pos'),
    setWindowPos: (x:number, y:number)  => ipcRenderer.send('set-window-pos', { x, y }),
    showDesktopLyricWindow: () => ipcRenderer.send('show-desktop-lyric-window'),
    hideDesktopLyricWindow: () => ipcRenderer.send('hide-desktop-lyric-window'),

    onMaximized: (callback: () => void) => {
        ipcRenderer.on('window-maximized', callback);
        return () => ipcRenderer.removeListener('window-maximized', callback);
    },
    onUnmaximized: (callback: () => void) => {
        ipcRenderer.on('window-unmaximized', callback);
        return () => ipcRenderer.removeListener('window-unmaximized', callback);
    },
    onTrayShow: (callback: () => void) => {
        ipcRenderer.on('tray-show', callback);
        return () => ipcRenderer.removeListener('tray-show', callback);
    },
});
