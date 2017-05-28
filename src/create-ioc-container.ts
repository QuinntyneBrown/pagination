import { AvatarService } from "./app/avatars/avatar.service";
import { Storage, StorageConfiguration } from "./app/utilities";
import { Environment } from "./app/environment";
import { Router } from "./app/router";

export const createIocContainer = () => [
    { provide: AvatarService, useValue: new AvatarService() },
    Environment,
    Router,
    Storage,
    StorageConfiguration
];