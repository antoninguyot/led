import {Field} from "./field";
import BaseComponent from "./FileUpload.svelte";

export class FileUpload extends Field {

    constructor(name: string) {
        super(name);
        this.component = BaseComponent
    }
}
