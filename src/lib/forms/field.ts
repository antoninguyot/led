import { titleCase } from "$lib/utils";

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
  required: boolean = false;
  dehydrateNull: boolean = false;

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

  setMutator(mutator: Mutator): this {
    this.mutator = mutator;
    return this;
  }

  setRequired(required: boolean = true): this {
    this.required = required;
    return this;
  }

  setDehydrateNull(dehydrateNull: boolean = true): this {
    this.dehydrateNull = dehydrateNull;
    return this;
  }

  getProps(): { [key: string]: any } {
    return {
      label: this.label,
      columnSpan: this.columnSpan,
      required: this.required,
    };
  }
}
