import { Injectable } from 'injection-js';
import { Avatar } from "./avatar.model";

@Injectable()
export class AvatarService {   
    constructor() {
        alert("?");
    } 
    public get(): Promise<Array<Avatar>> {
        return Promise.resolve([
            { url: "/src/images/avatar_1.png" },
            { url: "/src/images/avatar_2.png" },
            { url: "/src/images/avatar_3.png" },
            { url: "/src/images/avatar_4.png" },
            { url: "/src/images/avatar_5.png" },
            { url: "/src/images/avatar_6.png" },
            { url: "/src/images/avatar_7.png" },
            { url: "/src/images/avatar_8.png" }
        ]);
    } 
}
