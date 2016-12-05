import { AvatarService, Avatar } from "../avatars";
import { toPageListFromInMemory, PaginatedComponent } from "../pagination";

const template = require("./home.component.html");
const styles = require("./home.component.scss");

export class HomeComponent extends PaginatedComponent<Avatar> {
    constructor(
        private _homeService: AvatarService = AvatarService.Instance
    ) {
        super(4,1,".next",".previous");
    }

    connectedCallback() {        
        super.connectedCallback({ template, styles });        
    }

    public bind() {
        this._homeService.get().then((results:string) => {
            this.entities = JSON.parse(results) as Array<Avatar>;
            this.render();
        });
    }

    public render() {
        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);
        this._totalPagesElement.textContent = JSON.stringify(this.pagedList.totalPages);
        this._currentPageElement.textContent = JSON.stringify(this.pageNumber);

        this._containerElement.innerHTML = "";
        for (var i = 0; i < this.pagedList.data.length; i++) {
            const el = document.createElement("img");
            el.src = this.pagedList.data[i].url;
            this._containerElement.appendChild(el);
        }
    }
    
    private get _currentPageElement(): HTMLElement { return this.querySelector(".current-page") as HTMLElement; }

    private get _totalPagesElement(): HTMLElement { return this.querySelector(".total-pages") as HTMLElement; }

    private get _containerElement(): HTMLElement { return this.querySelector(".container") as HTMLElement; }

}

document.addEventListener("DOMContentLoaded",() => window.customElements.define(`ce-home`,HomeComponent));
