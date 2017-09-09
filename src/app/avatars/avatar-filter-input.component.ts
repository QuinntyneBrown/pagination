const template = document.createElement("template");
const html = require("./avatar-filter-input.component.html");
const css = require("./avatar-filter-input.component.css");
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export const AVATARS_FILTER_INPUT_TEXT_CHANGED = "[Avatars] Filter Input Text Changed";

export class AvatarFilterInputComponent extends HTMLElement {
    constructor() {
        super();
        this._onTextInputChanged = this._onTextInputChanged.bind(this);
        this._avatarFilterValue$ = new BehaviorSubject("");
    }

    static get observedAttributes () {
        return [
            "avatar-filter-value"
        ];
    }

    private _avatarFilterValue$: BehaviorSubject<string>;

    async connectedCallback() {
    
        template.innerHTML = `<style>${css}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'avatarfilterinput');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this._avatarFilterValue$.subscribe(value => this._textInputHTMLElement.value = value);
    }

    private _setEventListeners() {
        this._textInputHTMLElement.addEventListener("keyup",this._onTextInputChanged)
    }

    public _onTextInputChanged() {
        this.shadowRoot.dispatchEvent(new CustomEvent(AVATARS_FILTER_INPUT_TEXT_CHANGED, {
            cancelable: true,
            bubbles: true,
            composed: true,
            detail: { avatarFilterValue: this._textInputHTMLElement.value }
        } as EventInit));
    }

    disconnectedCallback() {
        this._textInputHTMLElement.removeEventListener("keyup", this._onTextInputChanged);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "avatar-filter-value":
                this._avatarFilterValue$.next(newValue);
                break;
        }
    }

    private get _textInputHTMLElement() { return this.shadowRoot.querySelector("input"); }
}

customElements.define(`ce-avatar-filter-input`,AvatarFilterInputComponent);
