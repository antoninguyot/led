<script lang="ts">
    import Entry from "./Entry.svelte";
    import {Color} from "$lib/colors";
    import {setContext} from "svelte";
    import Badge from "$lib/core/Badge.svelte";

    export let name: string;
    export let label: string;
    export let state: any = null;
    export let columnSpan: string | number = 1;
    export let color: Color | (() => Color) = Color.Blue;

    setContext("state", state);
</script>

<Entry {label} {name} {columnSpan}>
    <Badge color={color}>{state}</Badge>
</Entry>
