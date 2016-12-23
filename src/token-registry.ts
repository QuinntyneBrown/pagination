import { AvatarService } from "./app/avatars/avatar.service";


export class TokenRegistry {    
    public static get tokens():Array<any> {
        return [
            AvatarService
        ];
    }
}