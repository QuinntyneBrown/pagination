const template = document.createElement("template");
const html = require("./avatar-not-found.component.html");
const styles = require("./avatar-not-found.component.css");
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class AvatarNotFoundComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "avatar-filter-value"
        ];
    }

    public avatarFilterValue$: BehaviorSubject<string> = new BehaviorSubject("");

    async connectedCallback() {        
        template.innerHTML = `<style>${styles}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'avatarnotfound');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.avatarFilterValue$.subscribe(x => this.spanElement.innerText = x);
    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "avatar-filter-value":
                this.avatarFilterValue$.next(newValue);
                break;
        }
    }

    public get spanElement(): HTMLElement { return this.shadowRoot.querySelector("span"); }
}

customElements.define(`ce-avatar-not-found`,AvatarNotFoundComponent);
