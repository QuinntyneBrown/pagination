import { AppRouterOutletComponent } from "./app-router-outlet.component";
import offlineRuntime from "offline-plugin/runtime";

const template = require("./app.component.html");
const styles = require("./app.component.css");

export class AppComponent extends HTMLElement {
    connectedCallback() {                
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${styles}</style>${template}`;    

        this.routerOutlet = new AppRouterOutletComponent(this.routerOutletElement);
        this.routerOutlet.connectedCallback();
    }

    routerOutlet: AppRouterOutletComponent;
    get routerOutletElement() { return this.shadowRoot.querySelector(".router-outlet") as HTMLElement; }
}

customElements.define(`ce-app`, AppComponent);