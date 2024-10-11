<script lang="ts">
    import {Resource} from "$lib";
    import Table from "../tables/Table.svelte";
    import CreateAction from "../actions/CreateAction.svelte";

    export let resource: Resource<any>
</script>

{#await resource.list()}
{:then records}
    <Table
            title={resource.getResourceTitle()}
            records={records}
            columns={resource.table()}
            getRecordUrlUsing={resource.getViewUrl ?? resource.getEditUrl}
            emptyStateHeading="No {resource.getResourceTitle()}">
        <div slot="headerActions">
            {#if $$slots.actions}
                <slot name="actions"/>
            {:else}
                <CreateAction resource={resource}/>
            {/if}
        </div>
    </Table>
{:catch error}
    <Table
            title={resource.getResourceTitle()}
            records={[]}
            getRecordUrlUsing={() => null}
            columns={resource.table()}
            emptyStateHeading="Whoops. An error occured."
            emptyStateDescription={error.message}/>
{/await}
