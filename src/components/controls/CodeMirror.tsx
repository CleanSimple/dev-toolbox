import type { Component, JSX } from 'solid-js';

import { useTheme } from '@/contexts/ThemeContext';
import { defaultKeymap } from '@codemirror/commands';
import { Compartment, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap, lineNumbers, placeholder } from '@codemirror/view';
import { createEffect, on, onCleanup, onMount, splitProps } from 'solid-js';

type CodeMirrorProps = JSX.HTMLAttributes<HTMLDivElement> & {
    value: string;
    placeholder?: string;
    readonly?: boolean;
    lineWrapping?: boolean;
    onValueChange?: (value: string) => void;
};

const CodeMirror: Component<CodeMirrorProps> = (props) => {
    const [, rest] = splitProps(props, [
        'value',
        'placeholder',
        'readonly',
        'lineWrapping',
        'onValueChange',
    ]);
    const { actualTheme } = useTheme();
    let container!: HTMLDivElement;
    let view: EditorView | null = null;

    /* --- Value --- */
    createEffect(on(() => props.value, (value) => {
        if (!view) return;

        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: value,
            },
        });
    }));

    /* --- Line Wrapping --- */
    const lineWrapping = new Compartment();
    const getLineWrapping = () => (props.lineWrapping ?? true) ? EditorView.lineWrapping : [];
    createEffect(on(getLineWrapping, (content) => {
        if (!view) return;

        view.dispatch({
            effects: lineWrapping.reconfigure(content),
        });
    }));

    /* --- Theme --- */
    const editorTheme = new Compartment();
    const getEditorTheme = () => actualTheme() === 'dark' ? oneDark : [];
    createEffect(on(getEditorTheme, (content) => {
        if (!view) return;

        view.dispatch({
            effects: editorTheme.reconfigure(content),
        });
    }));

    onMount(() => {
        const state = EditorState.create({
            doc: ``,
            extensions: [
                keymap.of(defaultKeymap),
                lineNumbers(),
                placeholder(props.placeholder ?? ''),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        props.onValueChange?.(update.state.doc.toString());
                    }
                }),
                EditorState.readOnly.of(props.readonly ?? false),
                editorTheme.of(getEditorTheme()),
                lineWrapping.of(getLineWrapping()),
            ],
        });

        view = new EditorView({ state, parent: container });
    });

    onCleanup(() => {
        view?.destroy();
    });

    return <div ref={container} {...rest} />;
};

export default CodeMirror;
