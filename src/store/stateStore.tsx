import { makeAutoObservable } from "mobx";

class StateStore{
    
    showPage2 = false;
    mountPage2 = false; // Whether to mount the Page2 component. Prevents Page2 from fading out on app startup: On startup, Page2 should not use fadeOut; after Page2 appears for the first time, use fadeOut for subsequent hides.
    constructor() {
        makeAutoObservable(this);
    }
    setShowPage2(value: boolean) {
        this.showPage2 = value;
    }

    setMountPage2(value: boolean) {
        this.mountPage2 = value;
    }
    
}

const stateStore = new StateStore();
export default stateStore;
