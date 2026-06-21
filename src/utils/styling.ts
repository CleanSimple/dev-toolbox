import { hasKey } from ".";



interface MakeStyleOptions<TVariant, TColor, TSize> {
    variant?: TVariant extends PropertyKey ? TVariant : never
    color?: TColor extends PropertyKey ? TColor : never
    size?: TSize extends PropertyKey ? TSize : never
}

export function makeStyle<TVariant, TColor, TSize>(
    props: MakeStyleOptions<TVariant, TColor, TSize>,
    defaults?: NoInfer<MakeStyleOptions<TVariant, TColor, TSize>>
) {
    return {
        variant(variant: TVariant, styles: TColor extends PropertyKey ? Record<TColor, string> : string) {
            if (typeof styles === "string") {
                return variant === (props.variant ?? defaults?.variant) ? styles : null;
            }
            else {
                if (variant !== (props.variant ?? defaults?.variant))
                    return null;
                if (!props.color || !hasKey(styles, props.color))
                    return null;
                return styles[props.color];
            }
        },
        color(color: TColor, style: string) {
            return color === (props.color ?? defaults?.color) ? style : null;
        },
        size(size: TSize, style: string) {
            return size === (props.size ?? defaults?.size) ? style : null;
        }
    };
}