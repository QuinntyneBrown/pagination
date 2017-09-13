import { toPageListFromInMemory } from "./to-paged-list-from-in-memory";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { NEXT_CLICK, PREVIOUS_CLICK } from "./pager.component";
import { IPagedList } from "./paged-list.model";

export abstract class PaginatedComponent<T> extends HTMLElement {
    constructor(public pageSize: number, public pageNumber:number, private _nextSelector:string, private _previousSelector: string) {
        super();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);    
        this.onEntitiesChanged = this.onEntitiesChanged.bind(this);
    }
    
    connectedCallback(options: { template: string, styles: string }) {  
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${options.styles}</style>${options.template}`;    
        this.setEventListeners();
        this.bind();        
    }
    
    public setEventListeners() {
        this._nextElement.addEventListener(NEXT_CLICK, this.onNext);
        this._previousElement.addEventListener(PREVIOUS_CLICK, this.onPrevious);
        this.entities$.subscribe(this.onEntitiesChanged);
    }

    public abstract bind();

    disconnectedCallback() {
        this._nextElement.removeEventListener(NEXT_CLICK, this.onNext);
        this._previousElement.removeEventListener(PREVIOUS_CLICK, this.onPrevious);
    }

    public abstract render();
    public pagedList: IPagedList<T>;
    public entities: Array<T>;

    public entities$: BehaviorSubject<Array<T>> = new BehaviorSubject([] as Array<T>);

    public onEntitiesChanged(entities: Array<T>) {        

        if (entities && entities.length < 1) {
            this.classList.add("empty");
        } else {
            if (this.classList.contains("empty")) {
                this.classList.remove("empty");
            }
        }

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

    private get _nextElement(): HTMLElement { return this.shadowRoot.querySelector(this._nextSelector) as HTMLElement; }

    private get _previousElement(): HTMLElement { return this.shadowRoot.querySelector(this._previousSelector) as HTMLElement; }
}