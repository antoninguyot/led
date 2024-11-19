<script lang="ts">
    import type {Entry} from "$lib/infolists/entry";

    export let entries: Entry[];
    export let state: { [key: string]: any } = {};
    export let columns: number = 1;

    function getState(entry: Entry): any {
        if (entry.mutator?.afterLoading) {
            return entry.mutator.afterLoading(state[entry.name]);
        }

        return state[entry.name];
    }
</script>

<div class="grid gap-4 py-4 grid-cols-{columns}">
    {#each entries as entry}
        {#await getState(entry) then state}
            <svelte:component
                    this={entry.component}
                    name={entry.name}
                    state={state}
                    {...entry.getProps()}
            />
        {/await}
    {/each}
</div>