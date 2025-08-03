import { makeAutoObservable } from "mobx";
import { AudioFileInfo } from "../types";

class CustomPlayListsStore {

    customPlayLists: Map<string, AudioFileInfo[]> = new Map();

    constructor() {
        makeAutoObservable(this);
        const customPlayLists = localStorage.getItem('customPlayLists');
        console.log('customPlayLists', customPlayLists);
        if (customPlayLists) {
            this.customPlayLists = new Map(JSON.parse(customPlayLists) as [string, AudioFileInfo[]][]);            
            console.log('this.customPlayLists', this.customPlayLists);
           
        }
    }
    addPlayList(name: string, files: AudioFileInfo[]) {
        this.customPlayLists.set(name, files);
        localStorage.setItem('customPlayLists', JSON.stringify(this.customPlayLists));
    }
    removePlayList(name: string) {
        this.customPlayLists.delete(name);
        localStorage.setItem('customPlayLists', JSON.stringify(this.customPlayLists));
    }
    getPlayList(name: string): AudioFileInfo[] | undefined {
        return this.customPlayLists.get(name);
    }
    getAllPlayLists(): Map<string, AudioFileInfo[]> {
        return this.customPlayLists;
    }
    renamePlayList(oldName: string, newName: string) {
        if (this.customPlayLists.has(newName)) {
            alert(`歌单 "${newName}" 已存在，建议修改歌单名称`);
            return;
        }
        const files = this.customPlayLists.get(oldName);
        if (files) {
            this.customPlayLists.delete(oldName);
            this.customPlayLists.set(newName, files);
            localStorage.setItem('customPlayLists', JSON.stringify(this.customPlayLists));
        }
    }
    // 找到下一个默认的歌单名称
    getNextDefaultPlayListName(): string {
        let index = 1;
        while (this.customPlayLists.has(`新建歌单${index}`)) {
            index++;
        }
        return `新建歌单${index}`;
    }
    
};


const customPlayListsStore = new CustomPlayListsStore();
export default customPlayListsStore;

