import { html, render, TemplateResult } from "lit-html";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Mixin } from "../shared/mixin";
import { PagerBehavior } from "../pagination/pager.behavior";

@Mixin({ baseCtors: [PagerBehavior] })
export class AvatarRotatorPagerComponent extends HTMLElement implements PagerBehavior {
    constructor() {
        super();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }

    static get observedAttributes () {
        return [
            "current-page",
            "total-pages"
        ];
    }
    

    async connectedCallback() {    
        this.attachShadow({ mode: 'open' });

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'avatarrotatorpager');
        this.render(this._templateResult);
        this._setEventListeners();        
    }

    public render(templateResult: TemplateResult) {
        render(templateResult, this.shadowRoot);
    }

    
    private get _templateResult(): TemplateResult {

        return html`
            <style>
                :host {
                    display:block;
                    margin: 30px 0px;
                    width: 100%;
                    user-select:none;
                }

                .previous, .current-page-container, .next {
                    margin: 0;
                    padding: 0;
                    display: inline-block;
                    width: 32%;
                    text-align: center;
                }
            </style>

            <a class="previous">Previous</a>
            <span class="current-page-container">
                <a class="current-page">${this.currentPage}</a>/<a class="total-pages">${this.totalPages}</a>
            </span>
            <a class="next">Next</a>
        `;
    }

    private _setEventListeners() {
        this._nextElement.addEventListener("click", this.onNext);
        this._previousElement.addEventListener("click", this.onPrevious);
    }

    disconnectedCallback() {
        this._nextElement.removeEventListener("click", this.onNext);
        this._previousElement.removeEventListener("click", this.onPrevious);
    }

    public onNext(e) { }

    public onPrevious(e) { }

    public totalPages: number;

    public currentPage: number;

    private get _previousElement(): HTMLElement { return this.shadowRoot.querySelector(".previous") as HTMLElement; }

    private get _nextElement(): HTMLElement { return this.shadowRoot.querySelector(".next") as HTMLElement; }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "total-pages":
                this.totalPages = Number(newValue);
                if (this.parentNode) this.render(this._templateResult);
                break;

            case "current-page":
                this.currentPage = Number(newValue);
                if (this.parentNode) this.render(this._templateResult);
                break;
                
        }
    }    
}

customElements.define(`ce-avatar-rotator-pager`,AvatarRotatorPagerComponent);
