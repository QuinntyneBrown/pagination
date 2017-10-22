import { Avatar } from "../avatars";
import { toPageListFromInMemory, PaginationBehavior } from "../pagination";
import { Container } from "../../container";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Mixin } from "../shared/mixin";

const template = require("./avatar-rotator.component.html");
const styles = require("./avatar-rotator.component.css");

@Mixin({ baseCtors: [PaginationBehavior] })
export class AvatarRotatorComponent extends HTMLElement implements PaginationBehavior<any> {
    constructor() {
        super();
        this.pageSize = 1;
        this.pageNumber = 1;
        this.nextCssClass = ".next";
        this.previousCssClass = ".previous";
        this.onAvatarFilterValueChanged = this.onAvatarFilterValueChanged.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onEntitiesChanged = this.onEntitiesChanged.bind(this);
    }

    public onNext(e: Event) { /* Pagination Behavior */ }

    public onPrevious(e: Event) { /* Pagination Behavior */ }

    public onEntitiesChanged(entities: Array<any>) { /* Pagination Behavior */ }

    public pagedList: IPagedList<any>;

    public entities: Array<any>;

    public entities$: BehaviorSubject<any>;
    
    public pageSize: number;

    public pageNumber: number;

    public nextCssClass: string;

    public previousCssClass: string;
    
    private _avatars$: BehaviorSubject<any> = new BehaviorSubject([]);

    private _avatarFilterValue$: BehaviorSubject<string> = new BehaviorSubject("");

    static get observedAttributes() {
        return [
            "avatars",
            "avatar-filter-value"
        ];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${styles}</style>${template}`;
        this.nextElement.addEventListener("click", this.onNext);
        this.previousElement.addEventListener("click", this.onPrevious);
        this.bind();          
    }

    public bind() {
        this._avatars$.subscribe(this.onEntitiesChanged);
        this._avatarFilterValue$.subscribe(this.onAvatarFilterValueChanged);
        this.entities$.subscribe(this.onEntitiesChanged);
    }

    public onPagedListModelChange(pagedList: IPagedList<any>) { this.render(); }

    public render() {                
        this._totalPagesElement.textContent = JSON.stringify(this.pagedList.totalPages);
        this._currentPageElement.textContent = JSON.stringify(this.pageNumber);

        this._containerElement.innerHTML = "";
        for (let i = 0; i < this.pagedList.data.length; i++) {
            const slideElement = document.createElement("ce-avatar-rotator-slide");
            slideElement.setAttribute("avatar", JSON.stringify(this.pagedList.data[i]));
            this._containerElement.appendChild(slideElement);
        }
    }

    public onAvatarFilterValueChanged(value: string) {
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


    disconnectedCallback() {
        this.nextElement.removeEventListener("click", this.onNext);
        this.previousElement.removeEventListener("click", this.onPrevious);
    }

    private get _currentPageElement(): HTMLElement { return this.shadowRoot.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.shadowRoot.querySelector(".total-pages") as HTMLElement; }

    private get _containerElement(): HTMLElement { return this.shadowRoot.querySelector(".container") as HTMLElement; }    

    private get _headingElement(): HTMLElement { return this.shadowRoot.querySelector("h2") as HTMLElement; }

    public get nextElement(): HTMLElement { return this.shadowRoot.querySelector(this.nextCssClass) as HTMLElement; }

    public get previousElement(): HTMLElement { return this.shadowRoot.querySelector(this.previousCssClass) as HTMLElement; }
}

customElements.define(`ce-avatar-rotator`,AvatarRotatorComponent);