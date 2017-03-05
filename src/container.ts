import { createIocContainer } from "./create-ioc-container";
import { ReflectiveInjector, OpaqueToken } from 'injection-js';

export class Container {
    constructor() {
        this._injector = ReflectiveInjector.resolveAndCreate(createIocContainer());
    }

    private static _instance: Container;

    private static get Instance(): Container {
        this._instance = this._instance || new this();
        return this._instance;
    }

    public static resolve(token: any) {
        return this.Instance._injector.get(token);
    }

    private _injector: ReflectiveInjector;
}