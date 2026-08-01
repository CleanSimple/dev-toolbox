import type { ParentProps } from 'solid-js';

import { FlowsProvider } from '#/flows/contexts/FlowsContext';

export function Layout(props: ParentProps) {
    return (
        <FlowsProvider>
            {props.children}
        </FlowsProvider>
    );
}
