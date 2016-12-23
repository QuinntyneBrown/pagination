import { TokenRegistry } from "./token-registry";
import { ReflectiveInjector, Inject } from "@angular/core";

export class Container {
    constructor() {
        this._injector = ReflectiveInjector.resolveAndCreate(TokenRegistry.tokens);
    }

    private static _instance: Container;

    private static get Instance(): Container {
        this._instance = this._instance || new Container();
        return this._instance;
    }

    public static resolve(token: any) {
        return this.Instance._injector.get(token);
    }

    private _injector: ReflectiveInjector;
}