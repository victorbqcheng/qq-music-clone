import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { AudioFileInfo } from "../types";
import {parseFile} from "music-metadata";
import path from 'node:path';
import fs from 'node:fs';
import {uint8ArrayToBase64} from 'uint8array-extras';

const getAudioFileInfo = async (filePath: string): Promise<AudioFileInfo> => {
    // Simulate getting audio file info
    try {
        const metadata = await parseFile(filePath);
        return {
            title: metadata.common.title || path.basename(filePath, path.extname(filePath)),
            artist: metadata.common.artist || '未知艺术家',
            album: metadata.common.album || '未知专辑',
            duration: metadata.format.duration || 0,
            fileName: path.basename(filePath, path.extname(filePath)),
            filePath: 'file://' + filePath,
            img: metadata.common.picture ? `data:${metadata.common.picture[0].format};base64,${uint8ArrayToBase64(metadata.common.picture[0].data)}` : null,
            fileSize: fs.statSync(filePath).size,

        };
    } catch (error) {
        console.error('获取文件信息失败:', error);
        return {
            title: path.basename(filePath, path.extname(filePath)),
            artist: '未知艺术家',
            album: '未知专辑',
            duration: 0,
            fileName: path.basename(filePath, path.extname(filePath)),
            filePath: 'file://' + filePath,
            img: null,
            fileSize: 0
        };
    }
};


const SetupIPCHandlers = () => {

    ipcMain.on('quit', ()=>{
        app.quit();
    });

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
    ipcMain.on('close-main-window', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            // focusedWindow.close();
            app.quit();
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
    ipcMain.handle('add-files', async (event) => {
        const result = await dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Audio Files', extensions: ['mp3', 'wav', 'flac'] }
            ]
        });
        if (result.canceled) return [];
        const audioFileInfos = await Promise.all(result.filePaths.map(getAudioFileInfo));
        return audioFileInfos;
    });
};

export default SetupIPCHandlers;
