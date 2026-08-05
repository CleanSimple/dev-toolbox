import type { Accessor } from 'solid-js';

import { Button } from '@/components/ui/Button';
import { Check, Copy, RefreshCw, X } from 'lucide-solid';
import { createSignal, Match, Switch } from 'solid-js';

interface CopyButtonProps {
    source: Accessor<string | null | undefined>;
}

export function CopyButton(props: CopyButtonProps) {
    const [copyState, setCopyState] = createSignal<'ready' | 'processing' | 'copied' | 'error'>(
        'ready',
    );

    async function handleCopy() {
        if (copyState() !== 'ready') return;

        setCopyState('processing');
        try {
            const data = props.source();
            if (!data) throw new Error('No data to copy');

            await navigator.clipboard.writeText(data);
            setCopyState('copied');
        }
        catch {
            setCopyState('error');
        }

        setTimeout(() => {
            setCopyState('ready');
        }, 1000);
    }
    return (
        <Button
            variant='ghost'
            shape='square'
            title='Copy'
            onClick={() => void handleCopy()}
        >
            <Switch>
                <Match when={copyState() === 'ready'}>
                    <Copy size={20} />
                </Match>
                <Match when={copyState() === 'processing'}>
                    <RefreshCw size={20} class='animate-spin' />
                </Match>
                <Match when={copyState() === 'copied'}>
                    <Check size={20} class='text-success' />
                </Match>
                <Match when={copyState() === 'error'}>
                    <X size={20} class='text-danger' />
                </Match>
            </Switch>
        </Button>
    );
}
