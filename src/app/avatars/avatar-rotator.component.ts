import { Avatar } from "../avatars";
import { toPageListFromInMemory, PaginatedComponent } from "../pagination";
import { Container } from "../../container";

const template = require("./avatar-rotator.component.html");
const styles = require("./avatar-rotator.component.scss");

export class AvatarRotatorComponent extends PaginatedComponent<Avatar> {
    constructor() {
        super(1, 1, ".next", ".previous");
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    static get observedAttributes() {
        return ["avatars"];
    }

    connectedCallback() {
        super.connectedCallback({ template, styles });  
        this.setEventListeners();      
    }

    public bind() {  
          
    }

    public setEventListeners() {
        window.addEventListener("onkeyup", this.onKeyUp);
    }

    public onKeyUp() {
        alert("works?");
    }

    public render() {
        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);
        this._totalPagesElement.textContent = JSON.stringify(this.pagedList.totalPages);
        this._currentPageElement.textContent = JSON.stringify(this.pageNumber);

        this._containerElement.innerHTML = "";
        for (let i = 0; i < this.pagedList.data.length; i++) {
            const el = document.createElement("img");
            el.src = this.pagedList.data[i].url;
            this._containerElement.appendChild(el);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "avatars":                
                this.entities = JSON.parse(newValue);
                this.render();
                break;
        }
    }

    private get _currentPageElement(): HTMLElement { return this.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.querySelector(".total-pages") as HTMLElement; }

    private get _containerElement(): HTMLElement { return this.querySelector(".container") as HTMLElement; }

    private get _avatars(): Array<Avatar> { return JSON.parse(this.getAttribute("avatars")) as Array<Avatar>; }

}

customElements.define(`ce-avatar-rotator`,AvatarRotatorComponent);