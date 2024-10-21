export interface UnpaginatedResult<T> {
    records: T[];
}

export interface PaginatedResult<T> {
    total: number;
    pageNumber: number;
    pageSize: number;
    records: T[];
}