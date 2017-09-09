import { Injectable } from 'injection-js';
import { Avatar } from "./avatar.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AvatarService {   
    public get(): Promise<Array<Avatar>> {
        return Promise.resolve([
            { name: "", url: "/src/images/avatar_1.png" },
            { name: "", url: "/src/images/avatar_2.png" },
            { name: "", url: "/src/images/avatar_3.png" },
            { name: "", url: "/src/images/avatar_4.png" },
            { name: "", url: "/src/images/avatar_5.png" },
            { name: "", url: "/src/images/avatar_6.png" },
            { name: "", url: "/src/images/avatar_7.png" },
            { name: "", url: "/src/images/avatar_8.png" }
        ]);
    } 
}
