// import { AudioFileInfo } from "./types";

import type { AudioFileInfo } from "./types";

declare global {
    interface Window {
        NativeAPI: {
            ping?: () => Promise<string>;
            quit?: () => void;
            minimizeWindow?: () => void;
            maximizeWindow?: () => void;
            closeMainWindow?: () => void;
            fullscreenWindow?: () => void;
            addFiles?: () => Promise<AudioFileInfo[]>;
            getWindowPos?: () => Promise<[number, number]>;
            setWindowPos?: (x: number, y: number) => void;
            showDesktopLyricWindow?: () => void;
            hideDesktopLyricWindow?: () => void;

            onMaximized?: (callback: () => void) => ()=>void;
            onUnmaximized?: (callback: () => void) => ()=>void;
            onTrayShow?: (callback: () => void) => ()=>void;
        };
    }
}
