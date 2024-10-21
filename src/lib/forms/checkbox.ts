import {Field} from "./field";
import BaseComponent from "./Checkbox.svelte";

export class Checkbox extends Field {

    constructor(name: string) {
        super(name);
        this.component = BaseComponent
        this.mutator = {
            afterLoading: (state: boolean) => state,
            beforeSaving: (state: string) => state === 'on',
        }
    }
}
