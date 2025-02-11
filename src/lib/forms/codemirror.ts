import {Field} from "./field";
import BaseComponent from "./Codemirror.svelte";

export class Codemirror extends Field {
    extensions: any[] = [];

    constructor(name: string) {
        super(name);
        this.component = BaseComponent;
    }

    setExtensions(extensions: any[]) {
        this.extensions = extensions;
        return this;
    }

    getProps(): { [key: string]: any } {
        return {
            ...super.getProps(),
            ...{
                additionalExtensions: this.extensions,
            }
        };
    }
}
