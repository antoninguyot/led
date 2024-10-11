import type {Field} from "$lib/forms/field";

export class Form {
    schema: Field[] = []
    columns = 1

    setSchema(fields: Field[]): this {
        this.schema = fields;
        return this
    }

    setColumns(columns: number): this {
        this.columns = columns
        return this
    }
}