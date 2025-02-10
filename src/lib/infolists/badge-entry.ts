import {Entry} from "./entry";
import BaseComponent from "./BadgeEntry.svelte";
import {Color} from "$lib/colors";

export class BadgeEntry extends Entry {
    color: Color | (() => Color) = Color.Blue;

    constructor(name: string) {
        super(name);
        this.component = BaseComponent;
    }

    setColor(color: Color | (() => Color)): this {
        this.color = color;
        return this;
    }

    getProps(): { [key: string]: any } {
        return {
            label: this.label,
            columnSpan: this.columnSpan,
            color: this.color,
        };
    }
}
