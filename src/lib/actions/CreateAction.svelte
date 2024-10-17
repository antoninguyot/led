<script lang="ts">
    import {Resource} from "$lib/resources/resource";
    import Action from "$lib/actions/Action.svelte";

    export let resource: Resource<any>;
</script>

<Action url={resource.getCreateUrl()} label="Create {resource.getResourceTitle()}"/>
