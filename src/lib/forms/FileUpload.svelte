<script lang="ts">
    import Field from "./Field.svelte";

    export let name: string;
    export let label: string;
    export let state: any = null;
    export let columnSpan: string|number = 1;
    export let required: boolean = false;
</script>

<Field {label} {name} {columnSpan} {required}>
    <input type="file" {name} id={name} class="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" {required}/>
</Field>
