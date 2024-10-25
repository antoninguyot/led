<script lang="ts">
    import Breadcrumbs from "$lib/panels/Breadcrumbs.svelte";
    import type {NavigationItem} from "$lib/panels/navigation";
    import {getContext} from "svelte";
    import Navigation from "$lib/panels/Navigation.svelte";

    const isPanelInitialized = getContext<boolean>('panel-initialized');
    if (!isPanelInitialized) {
        throw new Error("Panel is uninitialized. Please wrap your main app slot with the <Panel> component.")
    }

    export let title: string = '';
    export let breadcrumbs: Promise<NavigationItem[]> = new Promise(() => [])
</script>


<header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex justify-between">
            <div>
                {#await breadcrumbs}
                    <div class="animate-pulse">
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    </div>
                {:then breadcrumbs}
                    <Breadcrumbs items={breadcrumbs}/>
                {/await}
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            </div>
            <div>
                <slot name="actions"/>
            </div>
        </div>
    </div>
</header>
<main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot/>
    </div>
</main>
