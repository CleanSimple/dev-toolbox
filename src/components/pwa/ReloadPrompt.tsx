import { Button } from '@/components/ui/Button';
import { Prompt } from '@/components/ui/Prompt';
import { RefreshCw } from 'lucide-solid';

interface ReloadPromptProps {
    show: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export function ReloadPrompt(props: ReloadPromptProps) {
    return (
        <Prompt
            title='Update Available'
            description='A newer version of Dev Toolbox is ready. Reload now to get the latest features.'
            show={props.show}
            icon={<RefreshCw size={20} class='animate-spin-slow' />}
            iconColor='info'
            onClose={props.onClose}
        >
            <div class='flex gap-2'>
                <Button
                    color='primary'
                    size='lg'
                    class='flex-1 shadow-lg shadow-brand/30'
                    onClick={props.onUpdate}
                >
                    Reload Now
                </Button>
                <Button size='lg' class='flex-1' onClick={props.onClose}>
                    Later
                </Button>
            </div>
        </Prompt>
    );
}
