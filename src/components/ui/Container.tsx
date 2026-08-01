import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { containerStyles } from '@/components/ui/Container.styles';
import { splitProps } from 'solid-js';

type ContainerVariantProps = VariantProps<typeof containerStyles>;
interface ContainerProps extends JSX.HTMLAttributes<HTMLDivElement>, ContainerVariantProps {
}

export function Container(props: ContainerProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size']);

    return <div class={containerStyles(variantProps)} {...rest} />;
}
