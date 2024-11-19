<script lang="ts">
    import Field from "./Field.svelte";

    export let name: string;
    export let label: string;
    export let state: any = null;
    export let columnSpan: string|number = 1
    export let required: boolean = false;
</script>

<Field {label} {name} {columnSpan} {required}>
    <input type="text" {name} id={name} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={state} {required}/>
</Field>
