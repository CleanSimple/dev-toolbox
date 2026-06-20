
interface MakeStyleOptions<TVariant, TSize> {
    variant?: TVariant
    size?: TSize
}

export function makeStyle<TVariant, TSize>(props: MakeStyleOptions<TVariant, TSize>, defaults?: MakeStyleOptions<TVariant, TSize>) {
    return {
        variant(variant: TVariant, style: string) {
            return variant == (props.variant ?? defaults?.variant) ? style : null;
        },
        size(size: TSize, style: string) {
            return size == (props.size ?? defaults?.size) ? style : null;
        }
    };
}