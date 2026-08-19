import type { DataFormatId } from '#/flows/definitions/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';
import type { Flow } from '#/flows/models';

const flow = (flow: {
    name: string;
    dataFormatId: DataFormatId;
    pipelines: {
        name: string;
        operations: {
            operationId: OperationId;
            formatterId: FormatterId;
        }[];
    }[];
}) => flow;

export const Flows = Object.freeze<Record<string, Flow>>({
    ...(import.meta.env.DEV ? devFlows() : {}),
    'url-encode': flow({
        name: 'URL Encode',
        dataFormatId: 'text',
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
    }),
    'url-decode': flow({
        name: 'URL Decode',
        dataFormatId: 'url-encoded',
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
    }),
    'base64-encode-text': flow({
        name: 'Base64 Encode Text',
        dataFormatId: 'text',
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
    }),
    'base64-encode-bytes': flow({
        name: 'Base64 Encode Bytes',
        dataFormatId: 'bytes',
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
    }),
    'base64-decode': flow({
        name: 'Base64 Decode',
        dataFormatId: 'base64',
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
    }),
    'json-prettify': flow({
        name: 'JSON Prettify',
        dataFormatId: 'json',
        pipelines: [
            {
                name: 'JSON Prettify',
                operations: [
                    {
                        operationId: 'json-no-op',
                        formatterId: 'json-indent-4',
                    },
                ],
            },
        ],
    }),
    'json-minify': flow({
        name: 'JSON Minify',
        dataFormatId: 'json',
        pipelines: [
            {
                name: 'JSON Minify',
                operations: [
                    {
                        operationId: 'json-no-op',
                        formatterId: 'json-compact',
                    },
                ],
            },
        ],
    }),
    'url-params-to-json': flow({
        name: 'URL Parameters to JSON',
        dataFormatId: 'url-parameters',
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
    }),
    'json-to-url-encoded-form': flow({
        name: 'JSON to URL-encoded Form',
        dataFormatId: 'json',
        pipelines: [
            {
                name: 'JSON to URL-encoded Form',
                operations: [
                    {
                        operationId: 'json-to-url-encoded-form',
                        formatterId: 'url-encoded-data',
                    },
                ],
            },
        ],
    }),
    'json-flatten': flow({
        name: 'Flatten JSON Object',
        dataFormatId: 'json',
        pipelines: [
            {
                name: 'Flatten JSON',
                operations: [
                    {
                        operationId: 'json-flatten',
                        formatterId: 'json-indent-4',
                    },
                ],
            },
        ],
    }),
    'path-to-unix': flow({
        name: 'Path to Unix',
        dataFormatId: 'text',
        pipelines: [
            {
                name: 'Path to Unix',
                operations: [
                    {
                        operationId: 'path-to-unix',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    }),
    'path-to-windows': flow({
        name: 'Path to Windows',
        dataFormatId: 'text',
        pipelines: [
            {
                name: 'Path to Windows',
                operations: [
                    {
                        operationId: 'path-to-windows',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    }),
    'json-string-encode': flow({
        name: 'JSON String Encode',
        dataFormatId: 'text',
        pipelines: [
            {
                name: 'JSON String Encode',
                operations: [
                    {
                        operationId: 'json-string-encode',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    }),
    'json-string-decode': flow({
        name: 'JSON String Decode',
        dataFormatId: 'text',
        pipelines: [
            {
                name: 'JSON String Decode',
                operations: [
                    {
                        operationId: 'json-string-decode',
                        formatterId: 'text',
                    },
                ],
            },
        ],
    }),
    'hash-text': flow({
        name: 'Text Hash Generator',
        dataFormatId: 'text',
        pipelines: [
            {
                name: 'SHA-1',
                operations: [
                    {
                        operationId: 'hash-text-sha1',
                        formatterId: 'hex-compact',
                    },
                ],
            },
            {
                name: 'SHA-256',
                operations: [
                    {
                        operationId: 'hash-text-sha256',
                        formatterId: 'hex-compact',
                    },
                ],
            },
            {
                name: 'SHA-384',
                operations: [
                    {
                        operationId: 'hash-text-sha384',
                        formatterId: 'hex-compact',
                    },
                ],
            },
            {
                name: 'SHA-512',
                operations: [
                    {
                        operationId: 'hash-text-sha512',
                        formatterId: 'hex-compact',
                    },
                ],
            },
            {
                name: 'CRC-32',
                operations: [
                    {
                        operationId: 'hash-text-crc32',
                        formatterId: 'hex-compact',
                    },
                ],
            },
        ],
    }),
    'bytes-to-text': flow({
        name: 'Bytes to Text',
        dataFormatId: 'bytes',
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
    }),
    'text-to-bytes': flow({
        name: 'Text to Bytes',
        dataFormatId: 'text',
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
    }),
});

function devFlows(): Record<string, Flow> {
    return {
        'test': flow({
            name: 'Bunch of Stuff™',
            dataFormatId: 'text',
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
        }),
        'bad-flow': flow({
            name: 'Bad Flow',
            dataFormatId: 'text',
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
                        {
                            operationId: 'bad-operation' as OperationId,
                            formatterId: 'bad-formatter' as FormatterId,
                        },
                    ],
                },
            ],
        }),
    };
}
