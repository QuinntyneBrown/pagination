import { HomeService } from "./home.service";
import { Avatar } from "./avatar.model";
import { toPageListFromInMemory } from "../pagination";

const template = require("./home.component.html");
const styles = require("./home.component.scss");

export class HomeComponent extends HTMLElement {
    constructor(
        private _homeService: HomeService = HomeService.Instance
    ) {
        super();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._addEventListeners();
    }

    private _bind() {
        this._homeService.get().then((results:string) => {
            this._entities = JSON.parse(results) as Array<Avatar>;
            this._render();
        });
    }

    private _render() {
        this._pagedList = toPageListFromInMemory(this._entities, this._pageNumber, this._pageSize);
        this._totalPagesElement.textContent = JSON.stringify(this._pagedList.totalPages);
        this._currentPageElement.textContent = JSON.stringify(this._pageNumber);

        this._containerElement.innerHTML = "";
        for (var i = 0; i < this._pagedList.data.length; i++) {
            const el = document.createElement("img");
            el.src = this._pagedList.data[i].url;
            this._containerElement.appendChild(el);
        }
    }

    private _addEventListeners() {
        this._nextElement.addEventListener("click", this.onNext);
        this._previousElement.addEventListener("click", this.onPrevious);
    }

    disconnectedCallback() {
        this._nextElement.removeEventListener("click", this.onNext);
        this._previousElement.removeEventListener("click", this.onPrevious);
    }
    
    private _pageSize: number = 4;
    private _pageNumber: number = 1;
    private _pagedList: IPagedList<Avatar>;
    private _entities: Array<Avatar>;

    public onNext(e: Event) {
        e.stopPropagation();

        if (this._pageNumber == this._pagedList.totalPages) {
            this._pageNumber = 1;
        } else {
            this._pageNumber = this._pageNumber + 1;
        }
        this._render();
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this._pageNumber == 1) {
            this._pageNumber = this._pagedList.totalPages;
        } else {
            this._pageNumber = this._pageNumber - 1;
        }
        this._render();
    }

    private get _currentPageElement(): HTMLElement { return this.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.querySelector(".total-pages") as HTMLElement; }

    private get _containerElement(): HTMLElement { return this.querySelector(".container") as HTMLElement; }

    private get _nextElement(): HTMLElement { return this.querySelector(".next") as HTMLElement; }

    private get _previousElement(): HTMLElement { return this.querySelector(".previous") as HTMLElement; }
}

document.addEventListener("DOMContentLoaded",() => window.customElements.define(`ce-home`,HomeComponent));
