import { Avatar } from "../avatars";
import { toPageListFromInMemory, PaginatedComponent } from "../pagination";
import { Container } from "../../container";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

const template = require("./avatar-rotator.component.html");
const styles = require("./avatar-rotator.component.scss");

export class AvatarRotatorComponent extends PaginatedComponent<any> {
    constructor() {
        super(1, 1, ".next", ".previous");
        
    }

    private _avatars$: BehaviorSubject<any> = new BehaviorSubject([]);

    static get observedAttributes() {
        return ["avatars"];
    }

    connectedCallback() {
        super.connectedCallback({ template, styles });  
        this.setEventListeners();              
    }

    public bind() { this._avatars$.subscribe(this.onEntitiesChanged); }

    
    public setEventListeners() {
        
    }
    
    public render() {
        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);
        this._totalPagesElement.textContent = JSON.stringify(this.pagedList.totalPages);
        this._currentPageElement.textContent = JSON.stringify(this.pageNumber);

        this._containerElement.innerHTML = "";
        for (let i = 0; i < this.pagedList.data.length; i++) {
            const h3El = document.createElement("h3");
            const imageEl = document.createElement("img");
            h3El.innerText = this.pagedList.data[i].name;
            imageEl.src = this.pagedList.data[i].url;
            this._containerElement.appendChild(h3El);
            this._containerElement.appendChild(imageEl);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "avatars":                
                this._avatars$.next(JSON.parse(newValue));                
                break;
        }
    }

    private get _currentPageElement(): HTMLElement { return this.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.querySelector(".total-pages") as HTMLElement; }

    private get _containerElement(): HTMLElement { return this.querySelector(".container") as HTMLElement; }

    private get _avatars(): Array<Avatar> { return JSON.parse(this.getAttribute("avatars")) as Array<Avatar>; }

}

customElements.define(`ce-avatar-rotator`,AvatarRotatorComponent);
