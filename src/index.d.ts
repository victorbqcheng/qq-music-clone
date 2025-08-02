// import { AudioFileInfo } from "./types";

import type { AudioFileInfo } from "./types";

declare global {
    interface Window {
        NativeAPI: {
            ping?: () => Promise<string>;
            minimizeWindow?: () => void;
            maximizeWindow?: () => void;
            closeWindow?: () => void;
            fullscreenWindow?: () => void;
            addFiles?: () => Promise<AudioFileInfo[]>;

            onMaximized?: (callback: () => void) => void;
            onUnmaximized?: (callback: () => void) => void;
        };
    }
}
