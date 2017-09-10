import {Avatar} from "./avatar.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const template = document.createElement("template");

const html = require("./avatar-rotator-slide.component.html");
const styles = require("./avatar-rotator-slide.component.css");

export class AvatarRotatorSlideComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "avatar"
        ];
    }

    async connectedCallback() {
        
        template.innerHTML = `<style>${styles}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'avatarrotatorslide');

        this._bind();
    }

    private async _bind() {
        this._avatar$.subscribe(x => {
            this.headingElement.innerHTML = x.name;
            this.imageElement.src = x.url;
        });
    }
    

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "avatar":
                this._avatar$.next(JSON.parse(newValue));
                break;
        }
    }

    
    private _avatar$: BehaviorSubject<Avatar> = new BehaviorSubject(<Avatar>{});

    private get headingElement(): HTMLElement { return this.shadowRoot.querySelector("h3"); }

    private get imageElement(): HTMLImageElement { return this.shadowRoot.querySelector("img"); }
}

customElements.define(`ce-avatar-rotator-slide`,AvatarRotatorSlideComponent);
