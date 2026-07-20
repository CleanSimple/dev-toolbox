import type { SupportedLang } from '@/types';

import { diagnosticsFromError } from '@/components/ui/CodeMirror/CodeMirror.diagnostics';
import { useTheme } from '@/contexts/ThemeContext';
import { closeBrackets } from '@codemirror/autocomplete';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
import { setDiagnostics } from '@codemirror/lint';
import { Compartment, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import {
    EditorView,
    keymap,
    lineNumbers,
    placeholder as placeholderExtension,
} from '@codemirror/view';
import { createEffect, on, onCleanup, onMount } from 'solid-js';
import './CodeMirror.styles.css';

const langs = {
    'text': [],
    'json': json(),
} satisfies Record<SupportedLang, unknown>;

interface CodeMirrorProps {
    value: string;
    placeholder?: string;
    class: string;
    readonly?: boolean;
    disabled?: boolean;
    lineWrapping?: boolean;
    error?: unknown;
    lang?: SupportedLang;
    onValueChange?: (value: string) => void;
}

export function CodeMirror(props: CodeMirrorProps) {
    const { actualTheme } = useTheme();
    let container!: HTMLDivElement;
    let view: EditorView | null = null;

    /* --- Value --- */
    createEffect(on(() => props.value, (value) => {
        if (!view) return;
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    }));

    /* --- Placeholder --- */
    const placeholder = new Compartment();
    const getPlaceholder = () => props.placeholder ? placeholderExtension(props.placeholder) : [];
    createEffect(on(getPlaceholder, (content) => {
        if (!view) return;
        view.dispatch({ effects: placeholder.reconfigure(content) });
    }));

    /* --- Line Wrapping --- */
    const lineWrapping = new Compartment();
    const getLineWrapping = () => (props.lineWrapping ?? true) ? EditorView.lineWrapping : [];
    createEffect(on(getLineWrapping, (content) => {
        if (!view) return;
        view.dispatch({ effects: lineWrapping.reconfigure(content) });
    }));

    /* --- Theme --- */
    const editorTheme = new Compartment();
    const getEditorTheme = () => actualTheme() === 'dark' ? oneDark : [];
    createEffect(on(getEditorTheme, (content) => {
        if (!view) return;
        view.dispatch({ effects: editorTheme.reconfigure(content) });
    }));

    /* --- Readonly --- */
    const readonly = new Compartment();
    const getReadonly = () => (props.readonly ?? false) ? EditorState.readOnly.of(true) : [];
    createEffect(on(getReadonly, (content) => {
        if (!view) return;
        view.dispatch({ effects: readonly.reconfigure(content) });
    }));

    /* --- Disabled --- */
    const disabled = new Compartment();
    const getDisabled = () => (props.disabled ?? false) ? EditorView.editable.of(false) : [];
    createEffect(on(getDisabled, (content) => {
        if (!view) return;
        view.dispatch({ effects: disabled.reconfigure(content) });
    }));

    /* --- Has Error --- */
    const hasError = new Compartment();
    const getHasError = () =>
        props.error
            ? EditorView.editorAttributes.of({ class: 'has-error' })
            : [];
    createEffect(on(getHasError, (content) => {
        if (!view) return;
        view.dispatch({ effects: hasError.reconfigure(content) });
    }));

    /* --- Lang --- */
    const lang = new Compartment();
    const getLang = () => langs[props.lang ?? 'text'];
    createEffect(on(getLang, (content) => {
        if (!view) return;
        view.dispatch({ effects: lang.reconfigure(content) });
    }));

    /* --- Diagnostics --- */
    createEffect(on(() => props.error, (error) => {
        if (!view) return;
        view.dispatch(setDiagnostics(view.state, diagnosticsFromError(error, view)));
    }));

    onMount(() => {
        const state = EditorState.create({
            doc: props.value,
            extensions: [
                keymap.of([...defaultKeymap, indentWithTab]),
                lineNumbers(),
                closeBrackets(),
                placeholder.of(getPlaceholder()),
                readonly.of(getReadonly()),
                editorTheme.of(getEditorTheme()),
                lineWrapping.of(getLineWrapping()),
                disabled.of(getDisabled()),
                hasError.of(getHasError()),
                lang.of(getLang()),

                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        props.onValueChange?.(update.state.doc.toString());
                    }
                }),
            ],
        });

        view = new EditorView({ state, parent: container });
    });

    onCleanup(() => {
        view?.destroy();
    });

    return <div ref={container} class={props.class} />;
}
