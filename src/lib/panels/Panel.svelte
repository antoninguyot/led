<script lang="ts">
    import {setContext} from "svelte";
    import {Resource} from "$lib";
    import {Toaster} from "svelte-sonner";

    export let logo: string | null = null;
    export let title: string;
    export let resources: Resource<any>[] = [];
    let navigationItems = resources.map(function (resource) {
        return resource.shouldRegisterNavigation() ? resource.getNavigationItem() : false;
    }).filter((item) => item)

    setContext('panel-initialized', true)
    setContext('panel-title', title)
    setContext('panel-logo', logo)
    setContext('panel-resources', resources)
    setContext('panel-navigation-items', navigationItems)
</script>

<div>
    <Toaster/>

    <slot/>
</div>