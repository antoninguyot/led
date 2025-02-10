<script lang="ts">
    import {setContext} from "svelte";
    import {Color} from "$lib/colors";
    import Badge from "$lib/core/Badge.svelte";

    export let state: string

    export let color: Color | (() => Color) = Color.Blue;

    setContext("state", state);
</script>

<Badge color={color}>{state}</Badge>
