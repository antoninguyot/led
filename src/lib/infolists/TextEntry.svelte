<script lang="ts">
    import Entry from "./Entry.svelte";

    export let name: string;
    export let label: string;
    export let state: any = null;
    export let columnSpan: string | number = 1;
    export let fontFamily: string;

    let fontClass;
    switch (fontFamily) {
        case "mono":
            fontClass = "font-mono";
            break;
        case "sans":
            fontClass = "font-sans";
            break;
        case "serif":
            fontClass = "font-serif";
            break;
        default:
            fontClass = "font-sans";
    }
</script>

<Entry {label} {name} {columnSpan}>
    <pre class="text-sm {fontClass}">{state}</pre>
</Entry>
