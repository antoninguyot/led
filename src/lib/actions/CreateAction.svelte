<script lang="ts">
    import {Resource} from "../resources/resource";
    import Action from "../actions/Action.svelte";

    export let resource: Resource<any>;
</script>

<Action url={resource.getCreateUrl()} label="Create {resource.getResourceTitle()}"/>
