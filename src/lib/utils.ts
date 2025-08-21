
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

// timeStr: [02:06.08] --> 126.08
export const parseLyricTime = (timeStr: string):number => {
    const timeStrArr = timeStr.replace('[', '').replace(']', '').split(':');
    const minutes = parseInt(timeStrArr[0]);
    const seconds = parseFloat(timeStrArr[1]);
    let result = minutes * 60 + seconds;
    result = Math.floor(result * 100) / 100;
    return result;
};