<script lang="ts">
    import Modal from "./Modal.svelte";
    import {goto} from "$app/navigation";
    import {setContext} from "svelte";

    export let type: string | null = null;
    export let link: boolean = false;
    export let label: string;
    export let color: string = "primary";
    export let url: string | (() => string) | null = null;
    export let record: any = null;
    export let requiresConfirmation: boolean = false;
    export let modalHeading: string | null = null;
    export let modalDescription: string | null = null;
    export let modalIcon: string | null = null;
    export let action:
        | ((data: { [key: string]: any }) => void)
        | ((data: { [key: string]: any }) => Promise<void>)
        | null = null;


    setContext("record", record);

    let colorClasses: string;
    switch (color) {
        case "primary":
            colorClasses =
                "bg-blue-600 hover:bg-blue-500 text-white focus-visible:outline-blue-600";
            break;
        case "danger":
            colorClasses =
                "bg-red-600 hover:bg-red-500 text-white focus-visible:outline-red-600";
            break;
        case "gray":
            colorClasses =
                "bg-white hover:bg-gray-50 text-gray-900 focus-visible:outline-gray-600";
            break;
    }

    let resolvedUrl = typeof url === "function" ? url() : url;

    let showModal = false;

    function defaultAction(): void {
        if (resolvedUrl) {
            if (resolvedUrl.startsWith('http')) {
                window.open(resolvedUrl, '_blank');
            } else {
                goto(resolvedUrl);
            }
        }
    }

    async function runAction() {
        const callback = action ?? defaultAction;
        callback({});
    }

    function handle() {
        if (requiresConfirmation) {
            showModal = true;
        } else {
            runAction();
        }
    }
</script>

{#if link}
    <span on:click={handle} class="text-sm cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">{label}</span>
{:else}
    <button
            on:click={handle}
            {type}
            class="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {colorClasses}"
    >
        {label}
    </button>
{/if}

<Modal {color} icon={modalIcon} heading={modalHeading ?? label} description={modalDescription} bind:isOpen={showModal}
       action={runAction}/>
