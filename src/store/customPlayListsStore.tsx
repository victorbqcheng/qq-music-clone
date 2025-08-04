import { makeAutoObservable } from "mobx";
import { AudioFileInfo } from "../types";

export type CustomPlayList = {
    name: string;
    files: AudioFileInfo[];
};

class CustomPlayListsStore {
    // id作为键
    customPlayLists: Map<string, CustomPlayList> = new Map();

    constructor() {
        makeAutoObservable(this);
        this.loadPlayListsFromLocalStorage();
    }
    addPlayList(name: string, files: AudioFileInfo[]):string|null {
        // 检查名称是否已存在
        if (this.isPlayListNameExists(name)) {
            return null; // 名称已存在，返回null
        }

        // 生成一个随机的唯一ID
        const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
        this.customPlayLists.set(id, { name, files });
        this.savePlayListsToLocalStorage();
        return id; // 返回新添加的歌单ID
    }
    removePlayList(name: string):void {
        // 查找对应的歌单ID
        for (const [id, playList] of this.customPlayLists.entries()) {
            if (playList.name === name) {
                this.customPlayLists.delete(id);
                this.savePlayListsToLocalStorage();
                return;
            }
        }
    }
    getPlayList(name: string): CustomPlayList {
        for (const playList of this.customPlayLists.values()) {
            if (playList.name === name) {
                return playList;
            }
        }
        return undefined;
    }
    getPlayListById(id: string): CustomPlayList {
        return this.customPlayLists.get(id);
    }

    getAllPlayLists(): Map<string, CustomPlayList> {
        return this.customPlayLists
    }
    renamePlayList(id: string, oldName: string, newName: string):boolean {
        // 检查新名称是否已存在
        for (const [_id, _playList] of this.customPlayLists.entries()) {
            if (_playList.name === newName && _id !== id) {
                return false; // 新名称已存在，重命名失败
            }
        }
        // 更新歌单名称
        const playList = this.customPlayLists.get(id);
        if (playList) {
            playList.name = newName;
            this.customPlayLists.set(id, playList);
            this.savePlayListsToLocalStorage();
            return true; // 重命名成功
        }
    }
    // 找到下一个默认的歌单名称
    getNextDefaultPlayListName(): string {
        let index = 1;
        let names = new Set<string>();
        for (const playList of this.customPlayLists.values()) {
            names.add(playList.name);
        }
        while (names.has(`新建歌单${index}`)) {
            index++;
        }
        return `新建歌单${index}`;
    }
    // 歌单名称是否已经存在
    isPlayListNameExists(name: string): boolean {
        for (const playList of this.customPlayLists.values()) {
            if (playList.name === name) {
                return true; // 名称已存在
            }
        }
        return false; // 名称不存在
    }
    // 添加文件到歌单
    addFileToPlayList(id: string, file: AudioFileInfo): void {
        const playList = this.customPlayLists.get(id);
        if (playList) {
            playList.files = [file, ...playList.files];
            this.customPlayLists.set(id, playList);
            this.savePlayListsToLocalStorage();
        }
    }
    // 从歌单中删除文件
    removeFileFromPlayList(id: string, filePath: string): void {
        const playList = this.customPlayLists.get(id);
        if (playList) {
            playList.files = playList.files.filter(file => file.filePath !== filePath);
            this.customPlayLists.set(id, playList);
            this.savePlayListsToLocalStorage();
        }
    }

    private savePlayListsToLocalStorage():void {
        const mapObj = Object.fromEntries(this.customPlayLists);
        localStorage.setItem('customPlayLists', JSON.stringify(mapObj));
    }
    private loadPlayListsFromLocalStorage():void {
        const customPlayLists = localStorage.getItem('customPlayLists');
        if (customPlayLists) {
            const parsedPlayLists = JSON.parse(customPlayLists) as Map<string, CustomPlayList>;
            this.customPlayLists = new Map(Object.entries(parsedPlayLists));
        }
    }
    
};


const customPlayListsStore = new CustomPlayListsStore();
export default customPlayListsStore;

