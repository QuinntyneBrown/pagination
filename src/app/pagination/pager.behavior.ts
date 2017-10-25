import { PagedList } from "./paged-list.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { toPageListFromInMemory } from "./to-paged-list-from-in-memory";
export const PAGER_CLICKED_EVENT = "PAGER_CLICKED"

export abstract class PagerBehavior extends HTMLElement {
    
    public onNext(e: Event) {
        e.stopPropagation();
        
        if (this.currentPage == this.totalPages) {
            this.currentPage = 1;
        } else {
            this.currentPage = this.currentPage + 1;
        }
        
        this.dispatchEvent(new CustomEvent(PAGER_CLICKED_EVENT, {
            detail: {
                direction: "next",
                currentPage: this.currentPage
            },
            bubbles: true,
            cancelable: false,
            composed: true
        } as CustomEventInit));
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this.currentPage == 1) {
            this.currentPage = this.totalPages;
        } else {
            this.currentPage = this.currentPage - 1;
        }
        
        this.dispatchEvent(new CustomEvent(PAGER_CLICKED_EVENT, {
            detail: {
                direction: "previous",
                currentPage: this.currentPage
            },
            bubbles: true,
            cancelable: false,
            composed:true
        } as CustomEventInit));
    }
    
    public abstract currentPage: number;    

    public abstract totalPages: number;
}



