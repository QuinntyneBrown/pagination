import { AvatarService } from "../avatars";
import { Container } from "../../container";

const template = require("./landing-page.component.html");
const styles = require("./landing-page.component.scss");

export class LandingPageComponent extends HTMLElement {
    constructor(
        private _avatarService: AvatarService = Container.resolve(AvatarService)
    ) {
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;          
        this._avatarService.get().then(a => this._avatarRotatorElement.setAttribute("avatars", JSON.stringify(a)));      
    }

    private get _avatarRotatorElement(): HTMLElement { return this.querySelector("ce-avatar-rotator") as HTMLElement; }
}

customElements.define(`ce-landing-page`,LandingPageComponent);
