
declare interface Window{
    NativeAPI:{
        ping: () => Promise<string>;
        minimizeWindow: () => void;
        maximizeWindow: () => void;
        closeWindow: () => void;
    };
}
