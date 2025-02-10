<script lang="ts">
    import {Field} from "$lib/forms/field";
    import Action from "$lib/actions/Action.svelte";
    import type {FormData} from "$lib/panels";
    import {readFileUpload} from "$lib/forms/utils";
    import {data_get, data_set} from "$lib/utils.js";

    export let fields: Field[];
    export let submit: (data: FormData) => void;
    export let state: { [key: string]: any } = {};
    export let columns: number = 1;

    async function handleSubmit(e: Event) {
        const formData = new FormData(e.target as HTMLFormElement);
        const data = new Map<string, any>();
        for (const field of fields) {
            let state = formData.get(field.name)
            if (state instanceof File) {
                 state = await readFileUpload(state);
            }
            if (field.mutator?.beforeSaving) {
                state = await field.mutator.beforeSaving(state);
            }
            data_set(data, field.name, state)
        }
        submit(data);
    }

    function getState(field: Field): any {
        let rawState = data_get(state, field.name);

        if (field.mutator?.afterLoading) {
            return field.mutator.afterLoading(rawState);
        }

        return rawState;
    }
</script>

<form on:submit={handleSubmit}>
    <div class="grid gap-4 py-4 grid-cols-{columns}">
        {#each fields as field}
            <svelte:component
                    this={field.component}
                    name={field.name}
                    state={getState(field)}
                    {...field.getProps()}
            />
        {/each}
    </div>

    <Action type="submit" label="Submit"/>
</form>
