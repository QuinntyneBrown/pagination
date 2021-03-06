import { AvatarService, AVATARS_FILTER_INPUT_TEXT_CHANGED, Avatar } from "../avatars";
import { Container } from "../../container";

const template = require("./landing-page.component.html");
const styles = require("./landing-page.component.css");

export class LandingPageComponent extends HTMLElement {
    constructor(
        private _avatarService: AvatarService = Container.resolve(AvatarService)
    ) {
        super();
        this._onAvatarsFilterInputTextChanged = this._onAvatarsFilterInputTextChanged.bind(this);
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `<style>${styles}</style> ${template}`;   
        
        this._avatars = await this._avatarService.get();

        this._avatarRotatorElement.setAttribute("avatars", JSON.stringify(this._avatars));

        document.body.addEventListener(AVATARS_FILTER_INPUT_TEXT_CHANGED, this._onAvatarsFilterInputTextChanged);
    }

    private _onAvatarsFilterInputTextChanged($event) {
        const filteredAvatars = this._avatars.filter(x => x.name.toLowerCase().indexOf($event.detail.avatarFilterValue.toLowerCase()) > -1);        
        this._avatarRotatorElement.setAttribute("avatars", JSON.stringify(filteredAvatars));
        this._avatarRotatorElement.setAttribute("avatar-filter-value", $event.detail.avatarFilterValue);
    }

    private _avatars: Array<Avatar> = [];

    private get _avatarRotatorElement(): HTMLElement { return this.shadowRoot.querySelector("ce-avatar-rotator") as HTMLElement; }
}

customElements.define(`ce-landing-page`, LandingPageComponent);
