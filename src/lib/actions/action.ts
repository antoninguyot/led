import {titleCase} from "$lib/utils";

export class Action {
    name: string;
    url: string | (() => string) | null = null;
    label: string;
    link: boolean = false;

    constructor(name: string) {
        this.name = name
        this.label = titleCase(name)
    }

    setLabel(label: string): this {
        this.label = label
        return this
    }

    setUrl(url: string | (() => string) | null): this {
        this.url = url
        return this
    }

    setLink(link: boolean): this {
        this.link = link
        return this
    }

    getProps(): { [key: string]: any } {
        return {
            label: this.label,
            url: this.url,
            link: this.link,
        };
    }
}
