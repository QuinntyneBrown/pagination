import { PagedList } from "./paged-list.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { toPageListFromInMemory } from "./to-paged-list-from-in-memory";
export const PAGER_CLICKED_EVENT = "PAGER_CLICKED"

export abstract class PagerBehavior extends HTMLElement {
    
    public onNext(e: Event) {
        e.stopPropagation();
        
        if (this.currentPage$.value == this.pagedList.totalPages) {
            this.currentPage$.next(1);
        } else {
            this.currentPage$.next(this.currentPage$.value + 1);
        }

        
        this.pagedList = toPageListFromInMemory(this.pagedList.entities, this.currentPage$.value, this.pagedList.pageSize);

        this.dispatchEvent(new CustomEvent(PAGER_CLICKED_EVENT, {
            detail: {
                pagedList: this.pagedList
            },
            bubbles: true,
            cancelable: false,
            composed: true
        } as CustomEventInit));
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this.currentPage$.value == 1) {
            this.currentPage$.next(this.pagedList.totalPages);
        } else {
            this.currentPage$.next(this.currentPage$.value - 1);
        }

        this.pagedList = toPageListFromInMemory(this.pagedList.entities, this.currentPage$.value, this.pagedList.pageSize);
        
        this.dispatchEvent(new CustomEvent(PAGER_CLICKED_EVENT, {
            detail: {
                pagedList: this.pagedList,
                currentPage: this.currentPage$.value
            },
            bubbles: true,
            cancelable: false,
            composed:true
        } as CustomEventInit));
    }

    public abstract pagedList: PagedList;
    
    public abstract currentPage$: BehaviorSubject<number>;    
}