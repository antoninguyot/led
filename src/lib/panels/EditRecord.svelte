<script lang="ts">
    import { Resource } from "../resources/resource";
    import Form from "../forms/Form.svelte";
    import Page from "../panels/Page.svelte";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";

    export let id: any;

    export let resource: Resource<any>;

    const record = resource.find(id);

    async function handleSubmit(data: FormData) {
        const updatePromise = resource.update(id, data);
        toast.promise(updatePromise, {
            loading: "Updating...",
            success: "Resource updated",
            error: (e) => (e instanceof Error ? e.message : "Unknown error"),
        });
        updatePromise.then(async () => goto(resource.getViewUrl(await record)));
    }

    async function getBreadcrumbs() {
        const resolvedRecord = await record;
        const parentBreadcrumbs = await resource.getBreadcrumbs();
        return parentBreadcrumbs.concat([
            {
                url: resource.getViewUrl(resolvedRecord),
                name: resource.getRecordTitle(resolvedRecord),
            },
            {
                url: resource.getEditUrl(resolvedRecord),
                name: "Edit",
            },
        ]);
    }
</script>

{#await record then resolvedRecord}
    <Page
        title="Edit {resource.getResourceTitle()}"
        breadcrumbs={getBreadcrumbs()}
    >
        <Form
            fields={resource.form().schema}
            columns={resource.form().columns}
            state={resolvedRecord}
            submit={handleSubmit}
        />
    </Page>
{/await}
