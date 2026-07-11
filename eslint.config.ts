import baseConfig from '@cleansimple/eslint-config/config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dev-dist']),
    ...baseConfig,
    {
        rules: {
            'no-restricted-imports': [
                'warn',
                {
                    patterns: [
                        {
                            group: ['../*'],
                            message: 'Use absolute imports instead of parent relative imports.',
                        },
                    ],
                },
            ],
        },
    },
]);
