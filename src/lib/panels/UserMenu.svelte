<script lang="ts">
    import {getContext} from "svelte";
    import {type User, UserProvider} from "$lib/panels/auth";

    let userProvider = getContext<UserProvider>('panel-user-provider');
    let user = getContext<Promise<User>>('panel-user');

    let isUserMenuOpen = false;

    async function redirectToProfile() {
        window.location = await userProvider.profileUrl();
    }

    async function logout() {
        await userProvider.logout();
    }
</script>

{#await user then user}
    {#if user}
        <div class="relative ml-3">
            <div>
                <button type="button"
                        on:click={() => isUserMenuOpen = !isUserMenuOpen}
                        class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full"
                         src={user.avatarUrl}
                         alt="">
                </button>
            </div>
            {#if isUserMenuOpen}
                <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                     role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <!-- Active: "bg-gray-100", Not Active: "" -->
                    <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                            id="user-menu-item-0" on:click={redirectToProfile}>Your Profile
                    </button>
                    <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                            id="user-menu-item-2" on:click={logout}>Sign out
                    </button>
                </div>
            {/if}
        </div>
    {/if}
{/await}