<script lang="ts">
    import {Resource} from "$lib";
    import Page from "$lib/panels/Page.svelte";
    import Action from "$lib/actions/Action.svelte";
    import DeleteAction from "$lib/actions/DeleteAction.svelte";

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

{#await record then resolvedRecord}
    <Page title="View {resource.getResourceTitle()}" breadcrumbs={getBreadcrumbs()}>
        Viewing {resolvedRecord.id}

        <slot name="relations"/>

        <div slot="actions">
            {#if $$slots.actions}
                <slot name="actions"/>
            {:else}
                <Action
                        url={resource.getEditUrl(resolvedRecord)}
                        label="Edit"
                />
                <DeleteAction resource={resource} id={id}/>
            {/if}
        </div>
    </Page>
{/await}
