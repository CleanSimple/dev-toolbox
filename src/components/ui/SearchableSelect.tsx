import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { ChevronDown, Search, X } from 'lucide-solid';
import {
    createComputed,
    createEffect,
    createSignal,
    For,
    on,
    onCleanup,
    onMount,
    Show,
    splitProps,
} from 'solid-js';
import { searchableSelectStyles } from './SearchableSelect.styles';

type SearchableSelectVariantProps = VariantProps<typeof searchableSelectStyles>;

export interface SearchableSelectProps<T> extends SearchableSelectVariantProps {
    items: T[];
    value?: T | null;
    renderValue: (item: T) => JSX.Element;
    renderItem: (item: T) => JSX.Element;
    placeholder?: string;
    class?: string;
    disabled?: boolean;
    filter?: (item: T, query: string) => boolean;
    onChange?: (value: T | null) => void;
}

export function SearchableSelect<T>(props: SearchableSelectProps<T>) {
    const [variantProps] = splitProps(props, ['size', 'hasError']);
    const [value, setValue] = createSignal<T | null>(props.value ?? null);
    const [isOpen, setIsOpen] = createSignal(false);
    const [searchQuery, setSearchQuery] = createSignal('');
    let containerRef: HTMLDivElement | undefined;
    let inputRef: HTMLInputElement | undefined;

    onMount(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef && !containerRef.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        onCleanup(() => {
            document.removeEventListener('mousedown', handleClickOutside);
        });
    });

    const filteredItems = () => {
        const query = searchQuery().toLowerCase();
        if (!query) return props.items;

        if (props.filter) {
            return props.items.filter(item => props.filter!(item, query));
        }

        return props.items.filter(item => stringify(item).includes(query));
    };

    const handleSelect = (item: T) => {
        setValue(() => item);
        setIsOpen(false);
    };

    const handleClear = (e: MouseEvent) => {
        e.stopPropagation();
        setValue(null);
    };

    const toggleOpen = () => {
        if (props.disabled) return;
        setIsOpen(prev => !prev);
    };

    // handle external value updates
    createComputed(() => {
        setValue(() => props.value ?? null);
    });

    // handle items updates
    createComputed(on(() => props.items, () => {
        const val = value();
        if (val && !props.items.includes(val)) {
            setValue(null);
        }
    }));

    createEffect(() => {
        props.onChange?.(value());
    });

    createEffect(() => {
        if (isOpen()) {
            setSearchQuery('');
            inputRef?.focus();
        }
    });

    const styles = searchableSelectStyles(variantProps);

    return (
        <div class={styles.base({ class: props.class })} ref={containerRef}>
            <button
                type='button'
                disabled={props.disabled}
                class={styles.trigger()}
                onClick={toggleOpen}
            >
                <div class='flex-1 truncate text-left'>
                    <Show
                        when={value()}
                        fallback={
                            <span class='text-subtle'>{props.placeholder ?? 'Select...'}</span>
                        }
                        keyed
                    >
                        {(value) => props.renderValue(value)}
                    </Show>
                </div>
                <div class='flex items-center shrink-0'>
                    <Show
                        when={value() && !props.disabled}
                        fallback={<ChevronDown size={16} class='text-subtle' />}
                    >
                        <div
                            class={styles.clearButton()}
                            onClick={handleClear}
                            role='button'
                            tabIndex={0}
                        >
                            <X size={16} />
                        </div>
                    </Show>
                </div>
            </button>

            <Show when={isOpen()}>
                <div class={styles.popover()}>
                    <div class={styles.searchContainer()}>
                        <Search size={16} class='shrink-0 text-subtle' />
                        <input
                            ref={inputRef}
                            type='text'
                            class={styles.searchInput()}
                            placeholder='Search...'
                            value={searchQuery()}
                            onInput={(e) => setSearchQuery(e.currentTarget.value)}
                            autofocus
                        />
                    </div>
                    <div class={styles.listContainer()}>
                        <For
                            each={filteredItems()}
                            fallback={
                                <div class='p-2 text-sm text-subtle text-center'>
                                    No results found.
                                </div>
                            }
                        >
                            {(item) => (
                                <div
                                    class={styles.listItem()}
                                    onClick={() => handleSelect(item)}
                                >
                                    {props.renderItem(item)}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
}

function stringify(value: unknown) {
    switch (typeof value) {
        case 'string':
            return value.toLowerCase();
        case 'number':
            return String(value);
        case 'object':
            return JSON.stringify(value).toLowerCase();
        default:
            return '';
    }
}
