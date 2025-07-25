import { makeAutoObservable } from "mobx";

class StateStore{
    
    showPage2 = false;
    constructor() {
        makeAutoObservable(this);
    }
    setShowPage2(value: boolean) {
        this.showPage2 = value;
    }
    
}

const stateStore = new StateStore();
export default stateStore;
