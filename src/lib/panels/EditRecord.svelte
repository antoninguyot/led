<script lang="ts">
  import { Resource } from "$lib/resources/resource";
  import Form from "$lib/forms/Form.svelte";
  import Page from "$lib/panels/Page.svelte";
  import { toast } from "svelte-sonner";
  import { goto } from "$app/navigation";
  import {setContext} from "svelte";

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

<Page title="Edit {resource.getResourceTitle()}" breadcrumbs={getBreadcrumbs()}>
  {#await record then resolvedRecord}
    <Form
      fields={resource.form().schema}
      columns={resource.form().columns}
      state={resolvedRecord}
      submit={handleSubmit}
    />
  {/await}
</Page>
