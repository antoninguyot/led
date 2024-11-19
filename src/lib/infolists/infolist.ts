import type {Entry} from "$lib/infolists/entry";

export class Infolist {
    schema: Entry[] = []
    columns = 1

    setSchema(entries: Entry[]): this {
        this.schema = entries;
        return this
    }

    setColumns(columns: number): this {
        this.columns = columns
        return this
    }
}