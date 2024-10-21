<script lang="ts">
    export let totalRecords: number = 0;
    export let pageNumber: number;
    export let pageSize: number;

    let startOfPage: number = (pageNumber - 1) * pageSize + 1;
    let endOfPage: number = Math.min(pageNumber * pageSize, totalRecords);
    let hasPreviousPage = pageNumber > 1;
    let hasNextPage = pageNumber * pageSize < totalRecords;
</script>

<div class="flex items-center justify-between border-t border-gray-200 bg-white px-3 py-3">
    <div class="flex flex-1 justify-between sm:hidden">
        <a href="#"
           class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#"
           class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
            <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{startOfPage}</span>
                to
                <span class="font-medium">{endOfPage}</span>
                of
                <span class="font-medium">{totalRecords}</span>
                results
            </p>
        </div>
        <div class="flex flex-1 justify-between sm:justify-end">
            {#if hasPreviousPage}
                <button on:click={() => pageNumber--}
                        class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                    Previous
                </button>
            {/if}
            {#if hasNextPage}
                <button on:click={() => pageNumber++}
                   class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Next</button>
            {/if}
        </div>
    </div>
</div>
