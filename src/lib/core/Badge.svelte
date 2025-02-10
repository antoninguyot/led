<script lang="ts">
    import {Color} from "$lib/colors";

    export let color: Color | (() => Color) = Color.Blue;

    let badgeClasses: string;
    switch (typeof color === "function" ? color() : color) {
        case Color.Blue:
            badgeClasses = "bg-blue-50 text-blue-600 ring-blue-500/10";
            break;
        case Color.Green:
            badgeClasses = "bg-green-50 text-green-600 ring-green-500/10";
            break;
        case Color.Yellow:
            badgeClasses = "bg-yellow-50 text-yellow-600 ring-yellow-500/10";
            break;
        case Color.Red:
            badgeClasses = "bg-red-50 text-red-600 ring-red-500/10";
            break;
        case Color.Gray:
            badgeClasses = "bg-gray-50 text-gray-600 ring-gray-500/10";
            break;
        case Color.Orange:
            badgeClasses = "bg-orange-50 text-orange-600 ring-orange-500/10";
            break;
    }
</script>

<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset {badgeClasses}">
    <slot/>
</span>