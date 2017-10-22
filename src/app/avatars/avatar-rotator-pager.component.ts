import { html, render, TemplateResult } from "lit-html";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class AvatarRotatorPagerComponent extends HTMLElement {
    constructor() {
        super();
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

        this._bind();
    }

    public render(templateResult: TemplateResult) {
        render(templateResult, this.shadowRoot);
    }

    private async _bind() {
        this.currentPage$.subscribe(x => this.render(this._templateResult));

        this.totalPages$.subscribe(x => this.render(this._templateResult));
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
                <a class="current-page">${this.currentPage$.value}</a>/<a class="total-pages">${this.totalPages$.value}</a>
            </span>
            <a class="next">Next</a>
        `;
    }
    
    public totalPages$: BehaviorSubject<string> = new BehaviorSubject("");

    public currentPage$: BehaviorSubject<string> = new BehaviorSubject("");

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "total-pages":
                this.totalPages$.next(newValue);
                break;

            case "current-page":
                this.currentPage$.next(newValue);
                break;
        }
    }    
}

customElements.define(`ce-avatar-rotator-pager`,AvatarRotatorPagerComponent);
