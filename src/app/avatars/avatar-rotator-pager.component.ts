import { html, render, TemplateResult } from "lit-html";

export class AvatarRotatorPagerComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [];
    }

    async connectedCallback() {    
        this.attachShadow({ mode: 'open' });

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'avatarrotatorpager');

        this.render(html`
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
                <a class="current-page"></a>/<a class="total-pages"></a>
            </span>
            <a class="next">Next</a>
        `);


        this._bind();
        this._setEventListeners();
    }

    public render(templateResult: TemplateResult) {
        render(templateResult, this.shadowRoot);
    }

    private async _bind() {

    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }

    private get _currentPageElement(): HTMLElement { return this.shadowRoot.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.shadowRoot.querySelector(".total-pages") as HTMLElement; }

}

customElements.define(`ce-avatar-rotator-pager`,AvatarRotatorPagerComponent);
