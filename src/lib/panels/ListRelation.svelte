<script lang="ts">
    import {Resource} from "$lib";
    import Table from "$lib/tables/Table.svelte";
    import CreateAction from "$lib/actions/CreateAction.svelte";

    export let resource: Resource<any>

    let pageSize: number;
    let pageNumber: number;
</script>

<Table
        title={resource.getResourceTitle()}
        records={resource.shouldPaginate ? resource.paginate(pageNumber, pageSize): resource.list()}
        columns={resource.table()}
        getRecordUrlUsing={resource.getViewUrl ?? resource.getEditUrl}
        emptyStateHeading="No {resource.getResourceTitle()}"
        bind:pageNumber={pageNumber}
        bind:pageSize={pageSize}>
    <div slot="headerActions">
        {#if $$slots.actions}
            <slot name="actions"/>
        {:else}
            <CreateAction resource={resource}/>
        {/if}
    </div>
</Table>
