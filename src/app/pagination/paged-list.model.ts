export interface IPagedList<T> {
    data: Array<T>;
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export class PagedList<T = any> implements IPagedList<T> { 
    constructor(private _data: Array<T>, private _page:number, private _pageSize:number, private _totalCount: number) { }
    get data(): Array<T> { return this._data; }
    get page(): number { return this._page; }
    get pageSize(): number { return this._pageSize; }
    get totalCount(): number { return this._totalCount; }
    get totalPages(): number { return Math.ceil(this._totalCount / this._pageSize); }
}
