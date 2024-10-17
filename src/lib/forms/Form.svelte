<script lang="ts">
    import { Field } from "$lib/forms/field";
    import Action from "$lib/actions/Action.svelte";

    export let fields: Field[];
    export let submit: (data: FormData) => void;
    export let state: { [key: string]: any } = {};
    export let columns: number = 1;

    function handleSubmit(e: Event) {
        const formData = new FormData(e.target as HTMLFormElement);
        fields.forEach(function (field) {
            if (field.mutator?.beforeSaving) {
                formData.set(
                    field.name,
                    field.mutator.beforeSaving(formData.get(field.name)),
                );
            }
        });
        submit(formData);
    }

    function getState(field: Field): any {
        if (field.mutator?.afterLoading) {
            return field.mutator.afterLoading(state[field.name]);
        }

        return state[field.name];
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

    <Action type="submit" label="Submit" />
</form>
