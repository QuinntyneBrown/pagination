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
            { url: "/src/images/avatar_1.png" },
            { url: "/src/images/avatar_2.png" },
            { url: "/src/images/avatar_3.png" },
            { url: "/src/images/avatar_4.png" },
            { url: "/src/images/avatar_5.png" },
            { url: "/src/images/avatar_6.png" },
            { url: "/src/images/avatar_7.png" },
            { url: "/src/images/avatar_8.png" }
        ]));
    }
    
}
