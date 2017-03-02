import { AvatarService } from "./app/avatars/avatar.service";
import { Storage, StorageConfiguration } from "./app/utilities";
import { Environment } from "./app/environment";
import { Router } from "./app/router";

export class ServiceCollection extends Array<any> {
    constructor() {
        super();
        
        this.addRange([
            AvatarService,
            Environment,
            Router,
            Storage,
            StorageConfiguration
        ]);
    }

    private addRange = (values: any[]) => values.map(value => this.push(value));
}