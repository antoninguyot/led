<script lang="ts">
    import {Resource} from "$lib";
    import Page from "$lib/panels/Page.svelte";
    import Action from "$lib/actions/Action.svelte";
    import DeleteAction from "$lib/actions/DeleteAction.svelte";
    import Infolist from "$lib/infolists/Infolist.svelte";

    export let id: any;

    export let resource: Resource<any>;

    const record = resource.find(id)

    async function getBreadcrumbs() {
        const resolvedRecord = await record;
        const parentBreadcrumbs = await resource.getBreadcrumbs()
        return parentBreadcrumbs.concat([
            {url: resource.getViewUrl(resolvedRecord), name: resource.getRecordTitle(resolvedRecord)},
        ])
    }
</script>

<Page title="View {resource.getResourceTitle()}" breadcrumbs={getBreadcrumbs()}>
    {#await record then resolvedRecord}
        {#if resource.infolist().schema.length > 0}
            <Infolist state={resolvedRecord} entries={resource.infolist().schema}
                      columns={resource.infolist().columns}/>
        {/if}

        <slot name="relations"/>
    {/await}

    <div slot="actions">
        {#if $$slots.actions}
            <slot name="actions"/>
        {:else}
            {#await record then resolvedRecord}
                <Action
                        url={resource.getEditUrl(resolvedRecord)}
                        label="Edit"
                />
            {/await}
            <DeleteAction resource={resource} id={id}/>
        {/if}
    </div>
</Page>
