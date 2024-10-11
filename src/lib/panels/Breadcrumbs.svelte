<script lang="ts">
    import type {NavigationItem} from "./navigation";

    export let items: NavigationItem[] = []
</script>

<nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center">
        {#each items as item, key}
            <li>
                <div class="flex items-center">
                    <a href={item.url} class="text-sm font-medium text-gray-500 hover:text-gray-700">{item.name}</a>
                    {#if key !== items.length - 1}
                        <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                  clip-rule="evenodd"/>
                        </svg>
                    {/if}
                </div>
            </li>
        {/each}
    </ol>
</nav>