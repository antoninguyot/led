<script lang="ts">
    import type {Column} from "$lib/tables/column";
    import Icon from '@iconify/svelte';
    import type {PaginatedResult, UnpaginatedResult} from "$lib/tables/utils";
    import Pagination from "$lib/tables/Pagination.svelte";
    import ActionComponent from "$lib/actions/Action.svelte";
    import {data_get} from "$lib/utils";
    import {Action} from "$lib/actions";

    export let columns: Column[];
    export let actions: Action[];
    export let records: Promise<UnpaginatedResult<any>> | Promise<PaginatedResult<any>>;
    export let emptyStateHeading: string | null = 'No record';
    export let emptyStateDescription: string | null = null;
    export let getRecordUrlUsing: (record: any) => string | null;
    export let title: string | null = null;

    export let pageNumber: number = 1;
    export let pageSize: number = 10;

    function getState(column: Column, record: any): any {
        let rawState = data_get(record, column.name);

        if (column.mutator?.afterLoading) {
            return column.mutator.afterLoading(rawState);
        }

        return rawState;
    }
</script>

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
                {#await records}
                    <div class="mx-auto grid max-w-lg justify-items-center text-center my-8">
                        <div class="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-500/20">
                            <Icon icon="heroicons:clock-20-solid"
                                  class="h-6 w-6 text-gray-500 dark:text-gray-400"/>
                        </div>
                        <h4 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">Loading</h4>
                    </div>
                {:then resolvedRecords}
                    {#if resolvedRecords.records.length > 0}
                        <table class="min-w-full divide-y divide-gray-300 table-fixed">
                            <thead class="bg-gray-50">
                            <tr>
                                {#each columns as column}
                                    <th scope="col"
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{column.label}</th>
                                {/each}
                                {#if actions.length > 0}
                                    <th scope="col"></th>
                                {/if}
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                            {#each resolvedRecords.records as record}
                                <tr class="{getRecordUrlUsing !== null ? 'hover:bg-gray-50' : ''} bg-white">
                                    {#each columns as column}
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <a href={getRecordUrlUsing !== null ? getRecordUrlUsing(record) : '#'}>
                                                {#await getState(column, record) then state}
                                                    <svelte:component this={column.component}
                                                                      state={state}
                                                                      {...column.getProps()}/>
                                                {/await}
                                            </a>
                                        </td>
                                    {/each}
                                    {#if actions.length > 0}
                                        <td>
                                            {#each actions as action}
                                                <ActionComponent record={record}
                                                                 {...action.getProps()}></ActionComponent>
                                            {/each}
                                        </td>
                                    {/if}
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                        {#if resolvedRecords.hasOwnProperty('total')}
                            <Pagination bind:pageNumber={pageNumber} bind:pageSize={pageSize}
                                        totalRecords={resolvedRecords.total}/>
                        {/if}
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
                {:catch e}
                    <div class="mx-auto grid max-w-lg justify-items-center text-center my-8">
                        <div class="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-500/20">
                            <Icon icon="heroicons:x-mark-20-solid"
                                  class="h-6 w-6 text-gray-500 dark:text-gray-400"/>
                        </div>
                        <h4 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">Whoops. An error
                            occured.</h4>
                        <p class="mt-1 text-sm text-gray-500">{e.message}</p>
                    </div>
                {/await}
            </div>
        </div>
    </div>
</div>

