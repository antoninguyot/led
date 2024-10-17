<script lang="ts">
    import { Resource } from "$lib/resources/resource";
    import Form from "$lib/forms/Form.svelte";
    import { toast } from "svelte-sonner";
    import Page from "./Page.svelte";
    import { goto } from "$app/navigation";

    export let resource: Resource<any>;

    const handleSubmit = async (data: FormData) => {
        const createPromise = resource.create(data);
        toast.promise(createPromise, {
            loading: "Creating...",
            success: "Resource created",
            error: (e) => (e instanceof Error ? e.message : "Unknown error"),
        });
        createPromise.then(() => goto(resource.getIndexUrl()));
    };

    async function getBreadcrumbs() {
        const parentBreadcrumbs = await resource.getBreadcrumbs();
        return parentBreadcrumbs.concat([
            { url: resource.getCreateUrl(), name: "Create", isActiveWhen: () => true },
        ]);
    }
</script>

<Page
    title="Create {resource.getResourceTitle()}"
    breadcrumbs={getBreadcrumbs()}
>
    <Form fields={resource.form().schema} columns={resource.form().columns} submit={handleSubmit} />
</Page>
