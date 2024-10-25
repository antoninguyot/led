<script lang="ts">
    import {setContext} from "svelte";
    import {Resource} from "$lib";
    import {Toaster} from "svelte-sonner";
    import Navigation from "$lib/panels/Navigation.svelte";
    import type {UserProvider} from "$lib/panels/auth";

    export let logo: string | null = null;
    export let title: string;
    export let resources: Resource<any>[] = [];
    export let userProvider: UserProvider | null = null;
    let navigationItems = resources.map(function (resource) {
        return resource.shouldRegisterNavigation() ? resource.getNavigationItem() : false;
    }).filter((item) => item)

    setContext('panel-initialized', true)
    setContext('panel-title', title)
    setContext('panel-logo', logo)
    setContext('panel-resources', resources)
    setContext('panel-navigation-items', navigationItems)

    if (userProvider) {
        setContext('panel-user-provider', userProvider)
        setContext('panel-user', userProvider.user())
        checkAuth();
    }

    async function checkAuth() {
        if (userProvider && !await userProvider.isAuthenticated()) {
            window.location = userProvider.loginUrl();
        }
    }
</script>

<div>
    <Toaster/>

    <div class="min-h-full">
        <Navigation/>
        <slot/>
    </div>
</div>