<script lang="ts">
  import { Resource } from "../resources/resource";
  import Table from "../tables/Table.svelte";
  import Page from "../panels/Page.svelte";
  import CreateAction from "../actions/CreateAction.svelte";

  export let resource: Resource<any>;
</script>

<Page
  title="List {resource.getResourcePluralTitle()}"
  breadcrumbs={resource.getBreadcrumbs()}
>
  <Table
    records={resource.list()}
    columns={resource.table()}
    getRecordUrlUsing={resource.getViewUrl ?? resource.getEditUrl}
    emptyStateHeading="No {resource.getResourceTitle()}"
  />
  <div slot="actions">
    {#if $$slots.actions}
      <slot name="actions" />
    {:else}
      <CreateAction {resource} />
    {/if}
  </div>
</Page>
