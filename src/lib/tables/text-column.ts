import {Column} from "./column";
import BaseComponent from "./TextColumn.svelte";

export class TextColumn extends Column {
    fontFamily: string = "sans-serif";

    constructor(name: string) {
        super(name);
        this.component = BaseComponent;
    }

    setFontFamily(fontFamily: string): this {
        this.fontFamily = fontFamily;
        return this;
    }

    getProps(): { [key: string]: any } {
        return {
            fontFamily: this.fontFamily
        };
    }
}