<script lang="ts">
    import type {Column} from "../tables/column";
    import Icon from '@iconify/svelte';

    export let columns: Column[];
    export let records: any[];
    export let emptyStateHeading: string | null = 'No record';
    export let emptyStateDescription: string | null = null;
    export let getRecordUrlUsing: (record: any) => string | null;
    export let title: string | null = null;
</script>

{#if records !== null}
    <div class="flow-root mt-4">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    {#if title || $$slots.headerActions}
                        <div class="w-full p-4 flex justify-between">
                            <span class="text-sm font-semibold">{title ?? 'Table'}</span>
                            <div>
                                <slot name="headerActions"/>
                            </div>
                        </div>
                    {/if}
                    {#if records.length > 0}
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                {#each columns as column}
                                    <th scope="col"
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{column.label}</th>
                                {/each}
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                            {#each records as record}
                                <tr class="{getRecordUrlUsing !== null ? 'hover:bg-gray-50' : ''} bg-white">
                                    {#each columns as column}
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <a href={getRecordUrlUsing !== null ? getRecordUrlUsing(record) : '#'}>
                                                <svelte:component this={column.component} state={record[column.name]}
                                                                  {...column.getProps()}/>
                                            </a>
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                    {:else}
                        <div class="mx-auto grid max-w-lg justify-items-center text-center my-8">
                            <div class="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-500/20">
                                <Icon icon="heroicons:x-mark-20-solid"
                                      class="h-6 w-6 text-gray-500 dark:text-gray-400"/>
                            </div>
                            <h4 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">{emptyStateHeading}</h4>
                            {#if emptyStateDescription}
                                <p class="mt-1 text-sm text-gray-500">{emptyStateDescription}</p>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <!--    <UiTable.Root>-->
    <!--        <UiTable.Header>-->
    <!--            <UiTable.Row>-->
    <!--                {#each columns as column}-->
    <!--                    <UiTable.Head>{column.name}</UiTable.Head>-->
    <!--                {/each}-->
    <!--            </UiTable.Row>-->
    <!--        </UiTable.Header>-->
    <!--        <UiTable.Body>-->
    <!--            {#each records as record}-->
    <!--                <UiTable.Row href={getRecordUrlUsing !== null ? getRecordUrlUsing(record) : '#'}>-->
    <!--                    {#each columns as column}-->
    <!--                        <svelte:component this={column.component} state={record[column.name]}/>-->
    <!--                    {/each}-->
    <!--                </UiTable.Row>-->
    <!--            {/each}-->
    <!--        </UiTable.Body>-->
    <!--    </UiTable.Root>-->
{/if}

