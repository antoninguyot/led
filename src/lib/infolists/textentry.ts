import {Entry} from "./entry";
import BaseComponent from "./TextEntry.svelte";

export class TextEntry extends Entry {
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
            label: this.label,
            columnSpan: this.columnSpan,
            fontFamily: this.fontFamily
        };
    }
}
