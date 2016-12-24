import { AvatarService } from "./app/avatars/avatar.service";
import { Storage, StorageConfiguration } from "./app/utilities";
import { Environment } from "./app/environment";
import { Router } from "./app/router";

export class TokenRegistry {    
    public static get tokens():Array<any> {
        return [
            AvatarService,
            Environment,
            Router,
            Storage,
            StorageConfiguration
        ];
    }
}