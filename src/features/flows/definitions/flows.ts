import type { Flow } from '#/flows/types/models';

export const Flows: Readonly<Record<string, Flow>> = Object.freeze({
    ...(import.meta.env.DEV ? devFlows() : {}),
    'base64-encode-text': {
        name: 'Base64 Encode',
        dataFormatId: 'text',
        parserId: 'text',
        pipelines: [
            {
                name: 'Base64 Encode',
                operations: [
                    {
                        operationId: 'base64-encode-text',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    },
    'base64-encode-bytes': {
        name: 'Base64 Encode',
        dataFormatId: 'bytes',
        parserId: 'hex',
        pipelines: [
            {
                name: 'Base64 Encode',
                operations: [
                    {
                        operationId: 'base64-encode-bytes',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    },
    'base64-decode': {
        name: 'Base64 Decode',
        dataFormatId: 'base64',
        parserId: 'base64',
        pipelines: [
            {
                name: 'Base64 Decode',
                operations: [
                    {
                        operationId: 'base64-decode',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    },
    'bytes-to-text': {
        name: 'Bytes to Text',
        dataFormatId: 'bytes',
        parserId: 'hex',
        pipelines: [
            {
                name: 'Bytes to Text',
                operations: [
                    {
                        operationId: 'bytes-to-text',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    },
    'text-to-bytes': {
        name: 'Text to Bytes',
        dataFormatId: 'text',
        parserId: 'text',
        pipelines: [
            {
                name: 'Text to Bytes',
                operations: [
                    {
                        operationId: 'text-to-bytes',
                        formatterId: 'bytes-hex-spaced-16',
                    },
                ],
            },
        ],
    },
});

function devFlows(): Record<string, Flow> {
    return {
        'test': {
            name: 'Test',
            dataFormatId: 'text',
            parserId: 'text',
            pipelines: [
                {
                    name: 'Bunch of Stuff™',
                    operations: [
                        {
                            operationId: 'base64-encode-text',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'text-to-bytes',
                            formatterId: 'bytes-hex-spaced-16',
                        },
                        {
                            operationId: 'bytes-to-text',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'parse-base64',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'base64-decode',
                            formatterId: 'text',
                        },
                    ],
                },
            ],
        },
        'bad-flow': {
            name: 'Bad Flow',
            dataFormatId: 'text',
            parserId: 'hex',
            pipelines: [
                {
                    name: 'Broken',
                    operations: [
                        {
                            operationId: 'parse-base64',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'format-bytes-hex-compact-16',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'base64-encode-text',
                            formatterId: 'bytes-hex-spaced-16',
                        },
                        {
                            operationId: 'bytes-to-text',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'base64-decode',
                            formatterId: 'text',
                        },
                    ],
                },
            ],
        },
    };
}
