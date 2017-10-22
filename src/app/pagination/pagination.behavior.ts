import { toPageListFromInMemory } from "./to-paged-list-from-in-memory";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IPagedList } from "./paged-list.model";

export const PAGE_LIST_MODEL_CHANGED = "PAGING_MODEL_CHANGED";

export abstract class PaginationBehavior<T> extends HTMLElement {
    constructor() {
        super();
    }

    public abstract pageSize: number;

    public abstract pageNumber: number;
    
    public pagedList: IPagedList<T>;

    public entities: Array<T>;

    public entities$: BehaviorSubject<Array<T>> = new BehaviorSubject([] as Array<T>);
    
    public abstract onPagedListModelChange(pagedList: IPagedList<any>);

    public onEntitiesChanged(entities: Array<T>) {        
        this.pageNumber = 1;
        this.entities = entities;
        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);
        this.onPagedListModelChange(this.pagedList);
    }

    public onNext(e: Event) {        
        e.stopPropagation();

        if (this.pageNumber == this.pagedList.totalPages) {
            this.pageNumber = 1;
        } else {
            this.pageNumber = this.pageNumber + 1;
        }

        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);

        this.onPagedListModelChange(this.pagedList);
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this.pageNumber == 1) {
            this.pageNumber = this.pagedList.totalPages;
        } else {
            this.pageNumber = this.pageNumber - 1;
        }

        this.pagedList = toPageListFromInMemory(this.entities, this.pageNumber, this.pageSize);

        this.onPagedListModelChange(this.pagedList);
    }    
}