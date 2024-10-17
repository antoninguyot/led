<script lang="ts">
    import Icon from "@iconify/svelte";
    import Action from "$lib/actions/Action.svelte";
    import { fade, scale } from "svelte/transition";

    export let isOpen: boolean;

    export let heading: string = "Modal";

    export let description: string = "";

    export let action: (data: { [key: string]: any }) => void | null = null;

    export let actionLabel: string = "Submit";

    export let cancelLabel: string = "Cancel";

    export let icon: string = "heroicons:x-mark-20-solid";

    export let color: string = "primary";

    let colorClasses: string;
    let iconColorClasses: string;
    switch (color) {
        case "primary":
            colorClasses = "bg-blue-100";
            iconColorClasses = "text-blue-500";
            break;
        case "danger":
            colorClasses = "bg-red-100";
            iconColorClasses = "text-red-500";
            break;
    }

    function closeModal(): void {
        isOpen = false;
    }
</script>

{#if isOpen}
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" transition:fade></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" on:click={closeModal} >
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6" transition:scale>
                    <div>
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full {colorClasses}">
                            <Icon {icon} class="h-6 w-6 {iconColorClasses}"/>
                        </div>
                        <div class="mt-3 text-center sm:mt-5">
                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                {heading}
                            </h3>
                            {#if description}
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        {description}
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <Action
                                action={closeModal}
                                label={cancelLabel}
                                color="gray"
                        />
                        <Action {action} {color} label={actionLabel}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
