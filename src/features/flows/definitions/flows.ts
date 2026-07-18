import type { Flow } from '#/flows/types/models';

export const Flows = Object.freeze<Record<string, Flow>>({
    ...(import.meta.env.DEV ? devFlows() : {}),
    'url-encode': {
        name: 'URL Encode',
        dataFormatId: 'text',
        parserId: 'text',
        pipelines: [
            {
                name: 'URL Encode',
                operations: [
                    {
                        operationId: 'url-encode',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    },
    'url-decode': {
        name: 'URL Decode',
        dataFormatId: 'url-encoded',
        parserId: 'url-encoded',
        pipelines: [
            {
                name: 'URL Decode',
                operations: [
                    {
                        operationId: 'url-decode',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    },
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
    'url-params-to-json': {
        name: 'URL Parameters to JSON',
        dataFormatId: 'url-parameters',
        parserId: 'url-parameters',
        pipelines: [
            {
                name: 'URL Parameters to JSON',
                operations: [
                    {
                        operationId: 'url-encoded-data-to-json',
                        formatterId: 'json-indent-4',
                    },
                ],
            },
        ],
    },
    'json-to-url-encoded-form': {
        name: 'JSON to URL-encoded Form',
        dataFormatId: 'json',
        parserId: 'json',
        pipelines: [
            {
                name: 'JSON to URL-encoded Form',
                operations: [
                    {
                        operationId: 'json-to-url-encoded-form',
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
                        formatterId: 'hex-spaced-16',
                    },
                ],
            },
        ],
    },
});

function devFlows(): Record<string, Flow> {
    return {
        'test': {
            name: 'Bunch of Stuff™',
            dataFormatId: 'text',
            parserId: 'text',
            pipelines: [
                {
                    name: 'Encode/Decode',
                    operations: [
                        {
                            operationId: 'base64-encode-text',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'base64-decode',
                            formatterId: 'text',
                        },
                    ],
                },
                {
                    name: 'Parse/Format',
                    operations: [
                        {
                            operationId: 'text-to-bytes',
                            formatterId: 'hex-compact',
                        },
                        {
                            operationId: 'format-hex-spaced-16',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'parse-hex',
                            formatterId: 'hex-spaced-16',
                        },
                    ],
                },
                {
                    name: 'Transform',
                    operations: [
                        {
                            operationId: 'text-to-bytes',
                            formatterId: 'hex-spaced-16',
                        },
                        {
                            operationId: 'bytes-to-text',
                            formatterId: 'text',
                        },
                    ],
                },
                {
                    name: 'Hash',
                    operations: [
                        {
                            operationId: 'hash-text-sha256',
                            formatterId: 'hex-compact',
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
                            operationId: 'format-hex-compact-16',
                            formatterId: 'text',
                        },
                        {
                            operationId: 'base64-encode-text',
                            formatterId: 'hex-spaced-16',
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
