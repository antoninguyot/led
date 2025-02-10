<script lang="ts">
    import {Resource} from "$lib/resources/resource";
    import Table from "$lib/tables/Table.svelte";
    import Page from "$lib/panels/Page.svelte";
    import CreateAction from "$lib/actions/CreateAction.svelte";

    export let resource: Resource<any>;

    let pageSize: number;
    let pageNumber: number;
</script>

<Page
        title="List {resource.getResourcePluralTitle()}"
        breadcrumbs={resource.getBreadcrumbs()}
>
    <Table
            records={resource.shouldPaginate ? resource.paginate(pageNumber, pageSize): resource.list()}
            columns={resource.table().columns}
            actions={resource.table().actions}
            getRecordUrlUsing={resource.getViewUrl ?? resource.getEditUrl}
            emptyStateHeading="No {resource.getResourceTitle()}"
            bind:pageNumber={pageNumber}
            bind:pageSize={pageSize}
    />
    <div slot="actions">
        {#if $$slots.actions}
            <slot name="actions"/>
        {:else}
            <CreateAction {resource}/>
        {/if}
    </div>
</Page>
