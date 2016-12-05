import { RouterOutlet } from "./router";

export class AppRouterOutletComponent extends RouterOutlet {
    constructor(el: HTMLElement) {
        super(el);
    }

    connectedCallback() { 
        this.setRoutes([
            { path: "/", name: "home" }          
        ] as any);
        

        super.connectedCallback();
    }

}

document.addEventListener("DOMContentLoaded",() => window.customElements.define(`ce-app-router-oulet`,AppRouterOutletComponent));
