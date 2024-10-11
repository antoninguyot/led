import {titleCase} from "$lib/utils";

export class Column {
    component: any;
    name: string;
    label: string;

    constructor(name: string) {
        this.name = name
        this.label = titleCase(name)
    }

    setLabel(label: string): this {
        this.label = label
        return this
    }

    getProps(): { [key: string]: any } {
        return {};
    }
}
