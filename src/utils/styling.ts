
interface MakeStyleOptions<TVariant, TColor, TSize> {
    variant?: TVariant
    color?: TColor
    size?: TSize
}

export function makeStyle<TVariant, TColor, TSize>(props: MakeStyleOptions<TVariant, TColor, TSize>, defaults?: MakeStyleOptions<TVariant, TColor, TSize>) {
    return {
        variant(variant: TVariant, style: string) {
            return variant == (props.variant ?? defaults?.variant) ? style : null;
        },
        color(color: TColor, style: string) {
            return color == (props.color ?? defaults?.variant) ? style : null;
        },
        size(size: TSize, style: string) {
            return size == (props.size ?? defaults?.size) ? style : null;
        }
    };
}