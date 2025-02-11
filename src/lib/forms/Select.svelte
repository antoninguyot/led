<script lang="ts">
    import {evaluate} from "$lib/utils.js";
    import Field from "./Field.svelte";

    export let name: string;
    export let state: any = null;
    export let required: boolean = false;
    export let options: any;

</script>

<Field {name} {required} {...$$restProps}>
    <select id={name} {name}
            class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {required}>
        {#await evaluate(options) then options}
            {#each Object.keys(options) as value}
                <option {value} selected={value === state}>{options[value]}</option>
            {/each}
        {/await}
    </select>
</Field>
