<script lang="ts">
    import { Resource } from "$lib/resources/resource";
    import Action from "$lib/actions/Action.svelte";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";

    export let resource: Resource<any>;
    export let id: any;

    async function deleteRecord(data: { [key: string]: any }): Promise<void> {
        const deletePromise = resource.delete(id);
        toast.promise(deletePromise, {
            loading: "Deleting...",
            success: "Resource deleted",
            error: (e) => (e instanceof Error ? e.message : "Unknown error"),
        });
        deletePromise.then(() => goto(resource.getIndexUrl()));
    }
</script>

<Action
    label="Delete"
    requiresConfirmation={true}
    color="danger"
    modalHeading="Are you sure you want to delete this resource ?"
    modalDescription="This operation cannot be undone"
    modalIcon="heroicons:trash-20-solid"
    action={deleteRecord}
/>
