import type { Component } from 'solid-js';

interface OutputProps {
    value?: string;
    error?: string;
}

const Output: Component<OutputProps> = (props) => {
    return (
        <div class="card p-4 gap-3">
            {/* Text Area */}
            <textarea
                class="input-field min-h-[200px] px-4 py-3 resize-y font-mono text-sm"
                value={props.value}
                readonly
            />

            {/* Error Messages */}
            {props.error && (
                <div class="px-3 py-2 bg-error-bg border border-error-border rounded-md text-sm text-error-text">
                    <span class="font-semibold">Error:</span> {props.error}
                </div>
            )}
        </div>
    );
};

export default Output;
