import {Table} from "$lib/tables";
import {Form} from "$lib/forms";
import {Infolist} from "$lib/infolists";
import type {NavigationItem, FormData} from "$lib/panels";
import type {PaginatedResult, UnpaginatedResult} from "$lib/tables/utils";

interface Record {
    id: string
}

export abstract class Resource<T extends Record> {

    static shouldRegisterNavigation = true;

    shouldPaginate = false;

    list(): Promise<UnpaginatedResult<T>> {
        throw new Error("Not implemented");
    }

    paginate(pageNumber: number|string, pageSize: number): Promise<PaginatedResult<T>> {
        throw new Error("Not implemented");
    }

    abstract create(data: FormData): Promise<void>

    abstract find(id: any): Promise<T>

    abstract update(id: any, data: FormData): Promise<void>

    abstract delete(id: any): Promise<void>

    abstract table(): Table

    abstract form(): Form

    infolist(): Infolist {
        return new Infolist();
    }

    abstract getViewUrl(record: T): string

    abstract getEditUrl(record: T): string

    abstract getIndexUrl(): string

    abstract getCreateUrl(): string

    getRecordTitle(record: T): string {
        return record.id
    }

    getResourceTitle(): string {
        return this.constructor.name;
    }

    getResourcePluralTitle(): string {
        return this.getResourceTitle() + 's';
    }

    getNavigationItem(): NavigationItem {
        return {
            name: this.getResourcePluralTitle(),
            url: this.getIndexUrl(),
            isActiveWhen: () => false
        }
    }

    shouldRegisterNavigation(): boolean {
        return true;
    }

    async getBreadcrumbs(): Promise<NavigationItem[]> {
        return [this.getNavigationItem()]
    }
}
