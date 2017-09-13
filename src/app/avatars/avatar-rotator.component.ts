import { Avatar } from "../avatars";
import { toPageListFromInMemory, PaginatedComponent } from "../pagination";
import { Container } from "../../container";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

const template = require("./avatar-rotator.component.html");
const styles = require("./avatar-rotator.component.css");

export class AvatarRotatorComponent extends PaginatedComponent<any> {
    constructor() {
        super(1, 1, "ce-pager", "ce-pager");

        this.onAvatarFilterValueChanged = this.onAvatarFilterValueChanged.bind(this);
    }

    private _avatars$: BehaviorSubject<any> = new BehaviorSubject([]);

    private _avatarFilterValue$: BehaviorSubject<string> = new BehaviorSubject("");

    static get observedAttributes() {
        return [
            "avatars",
            "avatar-filter-value"
        ];
    }

    connectedCallback() {
        super.connectedCallback({ template, styles });  
        this.setEventListeners();              
    }

    public bind() {
        this._avatars$.subscribe(this.onEntitiesChanged);
        this._avatarFilterValue$.subscribe(this.onAvatarFilterValueChanged);
    }
    
    public render() {
        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);
        this._pagerElement.setAttribute("total-pages", JSON.stringify(this.pagedList.totalPages));
        this._pagerElement.setAttribute("current-page", JSON.stringify(this.pageNumber));

        this._containerElement.innerHTML = "";
        for (let i = 0; i < this.pagedList.data.length; i++) {
            const slideElement = document.createElement("ce-avatar-rotator-slide");
            slideElement.setAttribute("avatar", JSON.stringify(this.pagedList.data[i]));
            this._containerElement.appendChild(slideElement);
        }
    }

    public onAvatarFilterValueChanged(value: string) {

        this._avatarNotFoundElement.setAttribute("avatar-filter-value", value);

        this._headingElement.innerHTML = (value != "") ? "Avatar Rotator <span>(Filtered)</span>" : "Avatar Rotator";
            
        for (let i = 0; i < this._containerElement.children.length; i++) {
            this._containerElement.children[i].setAttribute("avatar-filter-value", value);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "avatars":                
                this._avatars$.next(JSON.parse(newValue));                
                break;

            case "avatar-filter-value":
                this._avatarFilterValue$.next(newValue);
                break;
        }
    }
    
    private get _containerElement(): HTMLElement { return this.shadowRoot.querySelector(".container") as HTMLElement; }    

    private get _headingElement(): HTMLElement { return this.shadowRoot.querySelector("h2") as HTMLElement; }

    private get _pagerElement(): HTMLElement { return this.shadowRoot.querySelector("ce-pager") as HTMLElement; }

    private get _avatarNotFoundElement(): HTMLElement { return this.shadowRoot.querySelector("ce-avatar-not-found") as HTMLElement; }
}

customElements.define(`ce-avatar-rotator`,AvatarRotatorComponent);