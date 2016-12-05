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
            this._pagedList = toPageListFromInMemory(JSON.parse(results) as Array<Avatar>, this._pageNumber, this._pageSize);
            for (var i = 0; i < this._pagedList.data.length; i++) {

            }
        });
    }

    private _addEventListeners() {
        this._nextElement.addEventListener("click", this.onNext);
        this._previousElement.addEventListener("click", this.onPrevious);
    }

    disconnectedCallback() {

    }
    
    private _pageSize: number;
    private _pageNumber: number;
    private _pagedList: IPagedList<Avatar>;

    public onNext(e: Event) {
        e.stopPropagation();

        if (this._pageNumber == this._pagedList.totalPages) {
            this._pageNumber = 1;
        } else {
            this._pageNumber = this._pageNumber + 1;
        }
        this._bind();
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this._pageNumber == 1) {
            this._pageNumber = this._pagedList.totalPages;
        } else {
            this._pageNumber = this._pageNumber - 1;
        }
        this._bind();
    }

    private get _nextElement(): HTMLElement { return this.querySelector(".next") as HTMLElement; }

    private get _previousElement(): HTMLElement { return this.querySelector(".previous") as HTMLElement; }
}

document.addEventListener("DOMContentLoaded",() => window.customElements.define(`ce-home`,HomeComponent));
