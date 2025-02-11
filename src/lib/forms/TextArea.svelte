<script lang="ts">
    import Field from "./Field.svelte";

    export let name: string;
    export let state: any = null;
</script>

<Field {name} {...$$restProps}>
    <textarea
        rows="4"
        {name}
        id={name}
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >{state}</textarea
    >
</Field>
