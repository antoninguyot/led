<script lang="ts">
    export let state: string

    export let fontFamily: string

    let fontClass
    switch (fontFamily) {
        case 'mono':
            fontClass = 'font-mono'
            break
        case 'sans':
            fontClass = 'font-sans'
            break
        case 'serif':
            fontClass = 'font-serif'
            break
        default:
            fontClass = 'font-sans'
    }
</script>

<p class="{fontClass}">{state}</p>
