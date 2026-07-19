export function formatError(error: unknown) {
    return error instanceof Error ? error.message : String(error);
}

interface Token {
    text: string;
    start: number;
    end: number;
    length: number;
}

export function* regexSplit(input: string, separator: RegExp): Generator<Token> {
    const regex = new RegExp(
        separator.source,
        separator.flags.includes('g')
            ? separator.flags
            : separator.flags + 'g',
    );

    let lastEnd = 0;

    for (const match of input.matchAll(regex)) {
        const start = match.index;

        yield {
            text: input.slice(lastEnd, start),
            start: lastEnd,
            end: start,
            length: start - lastEnd,
        };

        lastEnd = start + match[0].length;
    }

    yield {
        text: input.slice(lastEnd),
        start: lastEnd,
        end: input.length,
        length: input.length - lastEnd,
    };
}
