import {Column} from "$lib/tables";
import {Action} from "$lib/actions";

export class Table {
    columns: Column[] = []
    actions: Action[] = []

    setColumns(columns: Column[]): this {
        this.columns = columns;
        return this
    }

    setActions(actions: Action[]): this {
        this.actions = actions;
        return this;
    }
}