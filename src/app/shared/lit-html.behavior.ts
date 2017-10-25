import { html, render, TemplateResult } from "lit-html";

export abstract class LitHTMLBehavior extends HTMLElement {

    public abstract templateResult: TemplateResult;

    public needsRender: boolean = true;

    public render(): void {
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
        render(this.templateResult, this.shadowRoot);
    }

    public async invalidate() {
        if (!this.needsRender) {
            this.needsRender = true;
            await 0;
            this.needsRender = false;
            this.render();
        }
    }
}