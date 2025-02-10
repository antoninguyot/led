import {Column} from "./column";
import BaseComponent from "./BadgeColumn.svelte";
import {Color} from "$lib/colors";

export class BadgeColumn extends Column {
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
            color: this.color
        };
    }
}