import {titleCase} from "../utils";

export class Action {
    name: string;
    url: string|null = null;
    label: string ;

    constructor(name: string) {
        this.name = name
        this.label = titleCase(name)
    }

    setLabel(label: string): this {
        this.label = label
        return this
    }

    setUrl(url: any): this {
        this.url = url
        return this
    }
}
