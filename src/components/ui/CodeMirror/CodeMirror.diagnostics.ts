import type { Diagnostic } from '@codemirror/lint';
import type { EditorView } from '@codemirror/view';

import { Text } from '@codemirror/state';

export function diagnosticsFromError(error: unknown, view: EditorView): Diagnostic[] {
    if (error instanceof SyntaxError) {
        return diagnosticsFromSyntaxError(error, view);
    }

    return [];
}

function diagnosticsFromSyntaxError(error: SyntaxError, view: EditorView): Diagnostic[] {
    const { from, to } = getErrorPosition(error, view.state.doc);
    if (from === -1) {
        return [];
    }

    return [{
        from,
        to,
        severity: 'error',
        message: error.message,
    }];
}

function getErrorPosition(error: SyntaxError, doc: Text): { from: number; to: number } {
    const posMatch = error.message.match(/at position (\d+)/);
    if (posMatch) {
        const pos = Math.min(Number(posMatch[1]), doc.length);
        return { from: pos, to: pos };
    }

    const lineColMatch = error.message.match(/at line (\d+) column (\d+)/);
    if (lineColMatch) {
        const pos = Math.min(
            doc.line(Number(lineColMatch[1])).from + (Number(lineColMatch[2])) - 1,
            doc.length,
        );
        return { from: pos, to: pos };
    }

    const invalidTokenMatch = error.message.match(/'(.+)' is not a valid/);
    if (invalidTokenMatch) {
        const from = find(doc, invalidTokenMatch[1]);
        return { from, to: from + invalidTokenMatch[1].length };
    }

    return { from: -1, to: -1 };
}

function find(doc: Text, needle: string): number {
    for (let lineNo = 1; lineNo <= doc.lines; lineNo++) {
        const line = doc.line(lineNo);
        const index = line.text.indexOf(needle);

        if (index !== -1) {
            return line.from + index;
        }
    }
    return 0;
}
