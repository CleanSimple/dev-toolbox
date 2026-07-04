import type { JSX } from 'solid-js';

import { useTheme } from '@/contexts/ThemeContext';
import { defaultKeymap } from '@codemirror/commands';
import { Compartment, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import {
    EditorView,
    keymap,
    lineNumbers,
    placeholder as placeholderExtension,
} from '@codemirror/view';
import { createEffect, on, onCleanup, onMount, splitProps } from 'solid-js';

import './CodeMirror.styles.css';

interface CodeMirrorProps extends JSX.HTMLAttributes<HTMLDivElement> {
    value: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    lineWrapping?: boolean;
    hasError?: boolean;
    onValueChange?: (value: string) => void;
}

export function CodeMirror(props: CodeMirrorProps) {
    const [, rest] = splitProps(props, [
        'value',
        'placeholder',
        'readonly',
        'disabled',
        'lineWrapping',
        'hasError',
        'onValueChange',
    ]);
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
        (props.hasError ?? false)
            ? EditorView.editorAttributes.of({ class: 'has-error' })
            : [];
    createEffect(on(getHasError, (content) => {
        if (!view) return;
        view.dispatch({ effects: hasError.reconfigure(content) });
    }));

    onMount(() => {
        const state = EditorState.create({
            doc: props.value,
            extensions: [
                keymap.of(defaultKeymap),
                lineNumbers(),
                placeholder.of(getPlaceholder()),
                readonly.of(getReadonly()),
                editorTheme.of(getEditorTheme()),
                lineWrapping.of(getLineWrapping()),
                disabled.of(getDisabled()),
                hasError.of(getHasError()),

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

    return <div ref={container} {...rest} />;
}
