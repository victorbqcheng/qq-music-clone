
export declare interface AudioFileInfo {
    title: string;
    artist: string;
    album: string;
    duration: number;
    fileName: string;
    filePath: string;
    img: string | null;
    fileSize: number;
};

export type PlayerState = {
    currentTrack: AudioFileInfo | null;
    isPlaying: boolean;
    volume: number;
    duration: number;
    currentTime: number;
};

