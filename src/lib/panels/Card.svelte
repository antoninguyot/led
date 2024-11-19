<script lang="ts">
    export let title: string | null = null;
</script>

<div class="flow-root mt-4">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white">
                {#if title || $$slots.headerActions}
                    <div class="w-full p-4 flex justify-between">
                        <span class="text-sm font-semibold">{title ?? 'Card'}</span>
                        <div>
                            <slot name="headerActions"/>
                        </div>
                    </div>
                {/if}
                <slot/>
            </div>
        </div>
    </div>
</div>