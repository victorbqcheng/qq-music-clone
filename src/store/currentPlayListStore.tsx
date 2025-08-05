import { makeAutoObservable } from "mobx";
import { AudioFileInfo } from 'src/types';

class CurrentPlayListStore {
    // 当前播放列表的ID
    currentPlayListID: string = '';
    audioFiles: AudioFileInfo[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    setPlayListID(id: string) {
        this.currentPlayListID = id;
    }
    getPlayListID() {
        return this.currentPlayListID;
    }

    setAudioFiles(files: AudioFileInfo[]) {
        this.audioFiles = files;
    }

    getAudioFiles() {
        return this.audioFiles;
    }
    clearAudioFiles() {
        this.audioFiles = [];
    }
    addAudioFiles(files: AudioFileInfo[]) {
        this.audioFiles.push(...files);
    }
    addAudioFile(file: AudioFileInfo) {
        this.audioFiles.push(file);
    }
    removeAudioFile(filePath: string) {
        this.audioFiles = this.audioFiles.filter(file => file.filePath !== filePath);
    }
}

const currentPlayListStore = new CurrentPlayListStore();
export default currentPlayListStore;