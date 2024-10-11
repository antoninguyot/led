<script lang="ts">
    import {Resource} from "../resources/resource";
    import Action from "../actions/Action.svelte";

    export let resource: Resource<any>;
    export let id: any;
</script>

<Action url={resource.getEditUrl({id})} label="Edit {resource.getResourceTitle()}"/>
