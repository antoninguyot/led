<script lang="ts">
    export let label: string;

    export let name: string;

    export let columnSpan: string|number;

    export let required: boolean = false;
</script>

<div class="col-span-{columnSpan}">
    <label for={name} class="block text-sm font-medium leading-6 text-gray-900">{label}{required ? '*' : ''}</label>
    <div class="mt-2">
        <slot/>
    </div>
</div>