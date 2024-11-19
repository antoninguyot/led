import {Field} from "./field";
import BaseComponent from "./Select.svelte";

export class Select extends Field {

    options: { [key: string]: string } | (() => { [key: string]: string }) | (() => Promise<{ [key: string]: string }>) = {};

    constructor(name: string) {
        super(name);
        this.component = BaseComponent
    }

    setOptions(options: { [key: string]: string } | (() => { [key: string]: string }) | (() => Promise<{ [key: string]: string }>)): this {
        this.options = options
        return this
    }

    getProps(): { [key: string]: any } {
        return {
            label: this.label,
            options: this.options,
            required: this.required,
        };
    }
}
