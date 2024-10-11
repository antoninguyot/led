import { titleCase } from "../utils";

interface Mutator {
  afterLoading: ((state: any) => any) | null;
  beforeSaving: ((state: any) => any) | null;
}

export class Field {
  component: any;
  name: string;
  label: string;
  columnSpan: string|number = 1;
  mutator: Mutator | null = null;

  constructor(name: string) {
    this.name = name;
    this.label = titleCase(name);
  }

  setLabel(label: string): this {
    this.label = label;
    return this;
  }

  setColumnSpan(span: string|number): this {
    this.columnSpan = span
    return this
  }

  setMutatator(mutator: Mutator): this {
    this.mutator = mutator;
    return this;
  }

  getProps(): { [key: string]: any } {
    return {
      label: this.label,
      columnSpan: this.columnSpan,
    };
  }
}
