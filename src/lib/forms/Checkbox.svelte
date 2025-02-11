<script lang="ts">
    import Field from "./Field.svelte";

    export let name: string;
    export let state: any = null;
    export let required: boolean = false;
</script>

<Field {name} {required} {...$$restProps}>
    <input {name} id={name} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={state} {required}>
</Field>
