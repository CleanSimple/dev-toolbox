import type { VariantProps } from 'tailwind-variants/lite';

import { dividerStyles } from '@/components/ui/Divider.styles';
import { splitProps } from 'solid-js';

type DividerVariantProps = VariantProps<typeof dividerStyles>;
interface DividerProps extends DividerVariantProps {
    class?: string;
}

export function Divider(props: DividerProps) {
    const [variantProps] = splitProps(props, ['class', 'orientation']);

    return <div class={dividerStyles(variantProps)} />;
}
