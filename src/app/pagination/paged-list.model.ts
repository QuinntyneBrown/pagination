export interface IPagedList<T> {
    data: Array<T>;
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    entities: Array<T>;
}

export class PagedList<T = any> implements IPagedList<T> { 
    constructor(public data: Array<T>, public page: number, public pageSize: number, public totalCount: number, public entities) {
        this.totalPages = Math.ceil(this.totalCount / this.pageSize); 
    }
    public totalPages;
}
