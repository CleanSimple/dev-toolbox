import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { labelStyles } from './Label.styles';

type LabelVariantProps = VariantProps<typeof labelStyles>;
interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement>, LabelVariantProps {
}

export function Label(props: LabelProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size']);

    return <label class={labelStyles(variantProps)} {...rest} />;
}
