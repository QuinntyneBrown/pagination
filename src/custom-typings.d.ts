/// <reference path="app/pagination/ipaged-list.d.ts" />

declare module "offline-plugin/runtime" {

    var offlineRuntime:any;

    export default offlineRuntime;
}

declare interface ActivatedRoute {
    name: string;
    params: any;
    authRequired: boolean;
    path: string;
    segments: Array<any>;
    routeParams: any;
}

declare interface RouteChangeOptions {
    currentView: HTMLElement;
    nextRouteName: string;
    previousRouteName: string;
    routeParams: any;
    cancelled: any;
    nextRoute?: ActivatedRoute;
}

declare var Quill:any;

declare var rome: any;
