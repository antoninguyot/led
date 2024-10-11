import { Field } from "./field";
import BaseComponent from "./TextArea.svelte";

export class TextArea extends Field {
  constructor(name: string) {
    super(name);
    this.component = BaseComponent;
  }
}
