<script lang="ts">
    export let label: string;

    export let name: string;

    export let columnSpan: string|number;
</script>

<div class="col-span-{columnSpan}">
    <label for={name} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    <div class="mt-1">
        <slot/>
    </div>
</div>