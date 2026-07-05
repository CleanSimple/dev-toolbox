import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { createModal, Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { For } from 'solid-js';

export function UIPreview() {
    const modal = createModal();

    async function handleOpenModal() {
        const result = await modal.show();
        console.log('Modal closed', result);
    }

    return (
        <div class='w-full flex flex-col items-center gap-5'>
            <h1>Surface</h1>
            <div class='flex flex-row items-start flex-wrap'>
                <span class='bg-base px-2'>base</span>
                <span class='bg-content px-2'>content</span>
                <div class='flex flex-col'>
                    <span class='bg-subtle hover:bg-hover px-2'>subtle</span>
                    <span class='bg-main hover:bg-hover px-2'>main</span>
                    <span class='bg-strong hover:bg-hover px-2'>strong</span>
                    <span class='bg-disabled text-on-disabled px-2'>disabled</span>
                </div>
                <div class='flex flex-col'>
                    <span class='bg-brand-subtle hover:bg-brand-hover text-on-brand px-2'>
                        brand (subtle)
                    </span>
                    <span class='bg-brand hover:bg-brand-hover text-on-brand px-2'>
                        brand (normal)
                    </span>
                    <span class='bg-brand-strong hover:bg-brand-hover text-on-brand px-2'>
                        brand (strong)
                    </span>
                </div>
                <div class='flex flex-col'>
                    <span class='bg-accent-subtle hover:bg-accent-hover text-on-accent px-2'>
                        accent (subtle)
                    </span>
                    <span class='bg-accent hover:bg-accent-hover text-on-accent px-2'>
                        accent (normal)
                    </span>
                    <span class='bg-accent-strong hover:bg-accent-hover text-on-accent px-2'>
                        accent (strong)
                    </span>
                </div>
            </div>

            <h1>Text</h1>
            <div class='flex flex-row items-start flex-wrap'>
                <span class='text-head px-2'>head</span>
                <span class='text-body px-2'>body</span>
                <span class='text-subtle px-2'>subtle</span>
                <span class='text-disabled px-2'>disabled</span>
                <span class='text-brand hover:text-brand-hover px-2'>brand</span>
                <span class='text-accent hover:text-accent-hover px-2'>accent</span>
            </div>

            <h1>Button</h1>
            <For each={['sm', 'md', 'lg'] as const}>
                {(size) => (
                    <div class='flex flex-row gap-5'>
                        <For each={['default', 'primary', 'secondary'] as const}>
                            {(color) => <Button color={color} size={size}>Button</Button>}
                        </For>
                        <Button color='primary' size={size} disabled>Button</Button>
                    </div>
                )}
            </For>

            <h1>Chip</h1>
            <For each={['filled', 'outlined'] as const}>
                {(variant) => (
                    <For each={['sm', 'md', 'lg'] as const}>
                        {(size) => (
                            <div class='flex flex-row gap-5'>
                                <For each={['default', 'primary', 'secondary'] as const}>
                                    {(color) => (
                                        <Chip variant={variant} color={color} size={size}>
                                            Chip
                                        </Chip>
                                    )}
                                </For>
                            </div>
                        )}
                    </For>
                )}
            </For>

            <h1>Input</h1>
            <For each={['sm', 'md', 'lg'] as const}>
                {(size) => (
                    <div class='flex flex-row gap-5'>
                        <Input size={size} value='Input!' />
                        <Input size={size} value='Input! (readonly)' readonly />
                        <Input size={size} value='Input! (disabled)' disabled />
                    </div>
                )}
            </For>

            <h1>Select</h1>
            <For each={['sm', 'md', 'lg'] as const}>
                {(size) => (
                    <div class='flex flex-row gap-5'>
                        <Select size={size}>
                            <option>Select</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </Select>
                        <Select size={size} disabled>
                            <option>Select (disabled)</option>
                        </Select>
                    </div>
                )}
            </For>

            <h1>Card</h1>
            <div class='self-stretch'>
                <Card class='flex flex-col gap-5'>
                    Card!
                    <Label>Label</Label>
                    <Input size='md' placeholder='Enter text' />
                    <Input size='md' placeholder='Enter text (readonly)' readonly />
                    <Input size='md' placeholder='Enter text (disabled)' disabled />
                </Card>
            </div>

            <h1>Modal</h1>
            <div>
                <Button onClick={() => void handleOpenModal()}>Open Modal</Button>
                <Modal title='Test' {...modal.props}>
                    Test
                </Modal>
            </div>
        </div>
    );
}
