<script lang="ts">
    import Field from "./Field.svelte";

    export let name: string;
    export let label: string;
    export let state: any = null;
    export let columnSpan: string|number = 1
</script>

<Field {label} {name} {columnSpan}>
    <input {name} id={name} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={state}>
</Field>
