import baseConfig from '@cleansimple/eslint-config/config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dev-dist']),
    ...baseConfig,
]);
