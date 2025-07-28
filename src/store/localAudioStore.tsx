import React from 'react'

import { makeAutoObservable } from "mobx";
import { AudioFileInfo } from 'src/types';

class LocalAudioStore{
    
    localAudioFiles: AudioFileInfo[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    setLocalAudioFiles(files: AudioFileInfo[]) {
        this.localAudioFiles = files;
    }
    addLocalAudioFile(file: AudioFileInfo) {
        this.localAudioFiles.push(file);
    }
    removeLocalAudioFile(filePath: string) {
        this.localAudioFiles = this.localAudioFiles.filter(file => file.filePath !== filePath);
    }
    clearLocalAudioFiles() {
        this.localAudioFiles = [];
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
