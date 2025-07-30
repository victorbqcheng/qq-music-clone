import React from 'react'

import { makeAutoObservable } from "mobx";
import { AudioFileInfo } from 'src/types';

class LocalAudioStore{
    
    localAudioFiles: AudioFileInfo[] = [];
    constructor() {
        makeAutoObservable(this);
        const storedFiles = localStorage.getItem('localAudioFiles');
        if (storedFiles) {
            this.localAudioFiles = JSON.parse(storedFiles) as AudioFileInfo[];
        }
    }
    setLocalAudioFiles(files: AudioFileInfo[]) {
        this.localAudioFiles = files;
        if(files.length>0){
            localStorage.setItem('localAudioFiles', JSON.stringify(files));
        }else{
            localStorage.removeItem('localAudioFiles');
        }
    }
    addLocalAudioFiles(files: AudioFileInfo[]) {
        this.localAudioFiles.push(...files);
        // 去重
        this.localAudioFiles = Array.from(new Set(this.localAudioFiles.map(file => file.filePath)))
            .map(filePath => this.localAudioFiles.find(file => file.filePath === filePath) as AudioFileInfo);
        // 更新本地存储
        localStorage.setItem('localAudioFiles', JSON.stringify(this.localAudioFiles));
    }
    addLocalAudioFile(file: AudioFileInfo) {
        // 检查是否已存在
        const exists = this.localAudioFiles.some(existingFile => existingFile.filePath === file.filePath);
        if (!exists) {
            this.localAudioFiles.push(file);
            localStorage.setItem('localAudioFiles', JSON.stringify(this.localAudioFiles));
        }
    }
    removeLocalAudioFile(filePath: string) {
        this.localAudioFiles = this.localAudioFiles.filter(file => file.filePath !== filePath);
        localStorage.setItem('localAudioFiles', JSON.stringify(this.localAudioFiles));
    }
    clearLocalAudioFiles() {
        this.localAudioFiles = [];
        localStorage.removeItem('localAudioFiles');
    }
    getLocalAudioFile(filePath: string): AudioFileInfo | undefined {
        return this.localAudioFiles.find(file => file.filePath === filePath);
    }
    getLocalAudioFiles(): AudioFileInfo[] {
        return this.localAudioFiles;
    }
    getLocalAudioFileCount(): number {
        return this.localAudioFiles.length;
    }
}

const localAudioStore = new LocalAudioStore();
export default localAudioStore;
