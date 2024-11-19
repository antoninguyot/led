import {titleCase} from "$lib/utils";

interface Mutator {
    afterLoading: ((state: any) => any) | null;
}

export class Column {
    component: any;
    name: string;
    label: string;
    mutator: Mutator | null = null;

    constructor(name: string) {
        this.name = name
        this.label = titleCase(name)
    }

    setLabel(label: string): this {
        this.label = label
        return this
    }

    setMutator(mutator: Mutator): this {
        this.mutator = mutator;
        return this;
    }

    getProps(): { [key: string]: any } {
        return {};
    }
}
