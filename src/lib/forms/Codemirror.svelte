<script context="module">
    import {EditorView, minimalSetup, basicSetup} from 'codemirror'
    import {keymap} from '@codemirror/view'
    import {indentWithTab} from "@codemirror/commands"

    export {minimalSetup, basicSetup}
</script>

<script lang="ts">
    import Field from "./Field.svelte";

    export let name: string;
    export let state: any = null;
    export let additionalExtensions: any[] = [];

    import {onMount, onDestroy, createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    let dom

    let _mounted = false
    onMount(() => {
        _mounted = true
        return () => {
            _mounted = false
        }
    })

    export let view = null

    /* Cached doc string so that we don't extract strings in bulk over and over. */
    let _docCached = null

    /* Overwrite the bulk of the text with the one specified. */
    function _setText(text) {
        view.dispatch({
            changes: {from: 0, to: view.state.doc.length, insert: text},
        })
        console.log(text)
    }

    const subscribers = new Set()

    const stateStore = {
        ready: () => (view !== null),
        subscribe(cb) {
            subscribers.add(cb)

            if (!this.ready()) {
                cb(null)
            } else {
                if (_docCached == null) {
                    _docCached = view.state.doc.toString()
                }
                cb(_docCached)
            }

            return () => void subscribers.delete(cb)
        },
        set(newValue) {
            if (!_mounted) {
                throw new Error('Cannot set docStore when the component is not mounted.')
            }

            const inited = _initEditorView(newValue)
            if (!inited) _setText(newValue)
        },
    }

    let extensions = [basicSetup, keymap.of([indentWithTab]), ...additionalExtensions];

    function _editorTxHandler(trs, view) {
        view.update(trs)

        let lastChangingTr
        if (lastChangingTr = trs.findLast(tr => tr.docChanged)) {
            _docCached = null
            if (subscribers.size) {
                dispatchDocStore(_docCached = lastChangingTr.newDoc.toString())
            }
            dispatch('change', {view, trs})
        }
    }

    function dispatchDocStore(s) {
        for (const cb of subscribers) {
            cb(s)
        }
    }

    // the view will be inited with the either doc (as long as that it is not `undefined`)
    // or the value in docStore once set
    function _initEditorView(initialDoc) {
        if (view !== null) {
            return false
        }

        view = new EditorView({
            doc: initialDoc,
            extensions,
            parent: dom,
            dispatchTransactions: _editorTxHandler,
        })
        return true
    }

    $: if (_mounted && state !== undefined) {
        const inited = _initEditorView(state)
        dispatchDocStore(state)
    }

    onDestroy(() => {
        if (view !== null) {
            view.destroy()
        }
    })
</script>

<Field {name} {...$$restProps}>
    <div class="bg-white">
        <div class="contents" bind:this={dom}></div>
    </div>
    <textarea bind:value={$stateStore} {name} id={name} class="hidden"></textarea>
</Field>
