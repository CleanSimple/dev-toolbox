import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { buttonStyles } from './Button.styles';

type ButtonVariantProps = VariantProps<typeof buttonStyles>;
interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
}

export function Button(props: ButtonProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'color', 'size']);

    return <button class={buttonStyles(variantProps)} {...rest} />;
}
