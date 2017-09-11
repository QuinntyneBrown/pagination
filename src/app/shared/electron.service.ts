import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

export class ElectronService {
    public ipcRenderer: typeof ipcRenderer;
    public childProcess: typeof childProcess;

    constructor() {
        this.isElectron = this.isElectron.bind(this);
        
        if (this.isElectron()) {
            this.ipcRenderer = window["require"]('electron').ipcRenderer;
            this.childProcess = window["require"]('child_process');
        }
    }

    public isElectron(){
        return window && window["process"] && window["process"].type;
    }
}