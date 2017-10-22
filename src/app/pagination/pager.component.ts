import { BehaviorSubject } from "rxjs/BehaviorSubject";
const template = document.createElement("template");
const html = require("./pager.component.html");
const css = require("./pager.component.css");


export const NEXT_CLICK = "NEXT CLICK";

export const PREVIOUS_CLICK = "PREVIOUS CLICK";

export class PagerComponent extends HTMLElement {
    constructor() {
        super();

        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    static get observedAttributes () {
        return [
            "current-page",
            "total-pages"
        ];
    }

    private _currentPage$: BehaviorSubject<number> = new BehaviorSubject(0);

    private _totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);

    async connectedCallback() {
        
        template.innerHTML = `<style>${css}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'pager');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this._currentPage$.subscribe(x => this._currentPageElement.innerText = `${x || 1}`);
        this._totalPages$.subscribe(x => this._totalPagesElement.innerText = `${x || 1}`);

    }

    private _setEventListeners() {
        this._nextElement.addEventListener("click", this.onNextClick);
        this._previousElement.addEventListener("click", this.onPreviousClick);
    }

    disconnectedCallback() {
        this._nextElement.removeEventListener("click", this.onNextClick);
        this._previousElement.removeEventListener("click", this.onPreviousClick);
    }

    public onNextClick() {
        this.dispatchEvent(new CustomEvent(NEXT_CLICK));
    }

    public onPreviousClick() {
        this.dispatchEvent(new CustomEvent(PREVIOUS_CLICK));
    }

    private get _currentPageElement(): HTMLElement { return this.shadowRoot.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.shadowRoot.querySelector(".total-pages") as HTMLElement; }

    private get _previousElement(): HTMLElement { return this.shadowRoot.querySelector(".previous") as HTMLElement; }

    private get _nextElement(): HTMLElement { return this.shadowRoot.querySelector(".next") as HTMLElement; }


    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "current-page":
                this._currentPage$.next(JSON.parse(newValue));
                break;

            case "total-pages":
                this._totalPages$.next(JSON.parse(newValue));
                break;
        }
    }
}

customElements.define(`ce-pager`,PagerComponent);
