// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('NativeAPI', {
    ping: ()=>ipcRenderer.invoke('ping'),
    quit: () => ipcRenderer.send('quit'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    // fullscreenWindow: () => ipcRenderer.send('fullscreen-window'),
    addFiles: () => ipcRenderer.invoke('add-files'),

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
