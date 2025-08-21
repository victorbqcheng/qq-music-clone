import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { AudioFileInfo, LyricLine } from "../types";
import { parseFile } from "music-metadata";
import path from 'node:path';
import fs from 'node:fs';
import { uint8ArrayToBase64 } from 'uint8array-extras';
import { parseLyricTime } from "../lib/utils";

const getAudioFileInfo = async (filePath: string): Promise<AudioFileInfo> => {
    // Simulate getting audio file info
    try {
        const metadata = await parseFile(filePath);
        // 查找相同文件名的歌词文件
        // 如果有歌词文件，读取歌词内容
        // 这里假设歌词文件与音频文件同名，后缀为.lrc
        const lyricFilePath = path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}.lrc`);
        let lyricLines: LyricLine[] = [];
        if (fs.existsSync(lyricFilePath)) {
            const lyricContent = fs.readFileSync(lyricFilePath, 'utf-8');
            // 这里可以进一步处理歌词内容，例如解析时间戳等
            if (lyricContent) {
                const tmp = lyricContent.split('\n');
                lyricLines = tmp.map((line, _index) => {
                    const timeStr = line.match(/\[\d+:\d+\.\d+\]/);
                    if (timeStr === null) {
                        return { time: 0, text: '' }; // 如果没有时间戳，默认时间为0
                    }
                    const time = parseLyricTime(timeStr[0]);
                    const lyric = line.replace(timeStr[0], '')
                    return { time: time, text: lyric };
                });
            }
        }

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

const getLyric = async (filePath:string, title:string): Promise<LyricLine[]> => {
    let lyricLines: LyricLine[] = [];
    if(filePath.startsWith('file://')){
        filePath = filePath.replace('file://', '');
    }
    let lyricFilePath = path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}.lrc`);
    let lyricContent = '';
    if (fs.existsSync(lyricFilePath)) {
        lyricContent = fs.readFileSync(lyricFilePath, 'utf-8');
    } else {
        lyricFilePath = path.join(path.dirname(filePath), `${title}.lrc`);
        if(fs.existsSync(lyricFilePath))
            lyricContent = fs.readFileSync(lyricFilePath, 'utf-8');
    }
    // 这里可以进一步处理歌词内容，例如解析时间戳等
    if (lyricContent) {
        const tmp = lyricContent.trim().split('\n');
        lyricLines = tmp.map((line, _index) => {
            const timeStr = line.match(/\[\d+:\d+\.\d+\]/);
            if (timeStr === null) {
                return { time: 0, text: '' }; // 如果没有时间戳，默认时间为0
            }
            const time = parseLyricTime(timeStr[0]);
            const lyric = line.replace(timeStr[0], '')
            return { time: time, text: lyric };
        });
    }
    return lyricLines;
};

const SetupIPCHandlers = () => {

    ipcMain.on('quit', () => {
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
    ipcMain.handle('get-lyric', async (event, filePath: string, title:string) => {
        if (!filePath) return [];
        const lyricLines = await getLyric(filePath, title);
        return lyricLines;
    });
};

export default SetupIPCHandlers;
