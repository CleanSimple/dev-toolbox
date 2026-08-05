import { Button } from '@/components/ui/Button';
import { Check, Clipboard, RefreshCw, X } from 'lucide-solid';
import { createSignal, Match, Switch } from 'solid-js';

interface PasteButtonProps {
    onPaste: (data: string) => void;
}

export function PasteButton(props: PasteButtonProps) {
    const [pasteState, setPasteState] = createSignal<'ready' | 'processing' | 'success' | 'error'>(
        'ready',
    );

    async function handlePaste() {
        if (pasteState() !== 'ready') return;

        setPasteState('processing');
        try {
            const data = await navigator.clipboard.readText();
            if (!data) throw new Error('No data to paste');

            props.onPaste(data);
            setPasteState('success');
        }
        catch {
            setPasteState('error');
        }

        setTimeout(() => {
            setPasteState('ready');
        }, 1000);
    }

    return (
        <Button
            variant='ghost'
            shape='square'
            title='Paste'
            onClick={() => void handlePaste()}
        >
            <Switch>
                <Match when={pasteState() === 'ready'}>
                    <Clipboard size={20} />
                </Match>
                <Match when={pasteState() === 'processing'}>
                    <RefreshCw size={20} class='animate-spin' />
                </Match>
                <Match when={pasteState() === 'success'}>
                    <Check size={20} class='text-success' />
                </Match>
                <Match when={pasteState() === 'error'}>
                    <X size={20} class='text-danger' />
                </Match>
            </Switch>
        </Button>
    );
}
