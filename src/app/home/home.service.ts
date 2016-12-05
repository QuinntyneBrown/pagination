import { fetch } from "../utilities";
import { Avatar } from "./avatar.model";

export class HomeService {
    
    private static _instance: HomeService;

    public static get Instance() {
        this._instance = this._instance || new this();
        return this._instance;
    }

    public get(): Promise<string> {
        return Promise.resolve(JSON.stringify([

        ]));
    }
    
}
