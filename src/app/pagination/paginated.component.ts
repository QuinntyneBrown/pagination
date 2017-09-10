import { toPageListFromInMemory } from "./to-paged-list-from-in-memory";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export abstract class PaginatedComponent<T> extends HTMLElement {
    constructor(public pageSize: number, public pageNumber:number, private _nextCssClass:string, private _previousCssClass: string) {
        super();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);    
        this.onEntitiesChanged = this.onEntitiesChanged.bind(this);
    }
    
    connectedCallback(options: { template: string, styles: string }) {  
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${options.styles}</style>${options.template}`;    
        this._nextElement.addEventListener("click", this.onNext);
        this._previousElement.addEventListener("click", this.onPrevious);
        this.setEventListeners();
        this.bind();        
    }
    
    public setEventListeners() {
        this.entities$.subscribe(this.onEntitiesChanged);
    }

    public abstract bind();

    disconnectedCallback() {
        this._nextElement.removeEventListener("click", this.onNext);
        this._previousElement.removeEventListener("click", this.onPrevious);
    }

    public abstract render();
    public pagedList: IPagedList<T>;
    public entities: Array<T>;

    public entities$: BehaviorSubject<Array<T>> = new BehaviorSubject([] as Array<T>);

    public onEntitiesChanged(entities: Array<T>) {        
        this.pageNumber = 1;
        this.entities = entities;
        this.render();
    }

    public onNext(e: Event) {        
        e.stopPropagation();

        if (this.pageNumber == this.pagedList.totalPages) {
            this.pageNumber = 1;
        } else {
            this.pageNumber = this.pageNumber + 1;
        }
        this.render();
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this.pageNumber == 1) {
            this.pageNumber = this.pagedList.totalPages;
        } else {
            this.pageNumber = this.pageNumber - 1;
        }
        this.render();
    }

    private get _nextElement(): HTMLElement { return this.shadowRoot.querySelector(this._nextCssClass) as HTMLElement; }

    private get _previousElement(): HTMLElement { return this.shadowRoot.querySelector(this._previousCssClass) as HTMLElement; }
}