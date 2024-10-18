import {Column} from "$lib/tables";
import type {NavigationItem, FormData} from "$lib/panels";
import {Form} from "$lib/forms";

interface Record {
    id: string
}

export abstract class Resource<T extends Record> {

    static shouldRegisterNavigation = true;

    abstract list(): Promise<T[]>

    abstract create(data: FormData): Promise<void>

    abstract find(id: any): Promise<T>

    abstract update(id: any, data: FormData): Promise<void>

    abstract delete(id: any): Promise<void>

    abstract table(): Column[]

    abstract form(): Form

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
