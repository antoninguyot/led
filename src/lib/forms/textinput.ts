import {Field} from "./field";
import BaseComponent from "./TextInput.svelte";

export class TextInput extends Field {

    constructor(name: string) {
        super(name);
        this.component = BaseComponent
    }
}
