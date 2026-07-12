/// <reference types="vitest/config" />
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import lucidePreprocess from 'vite-plugin-lucide-preprocess';
import { VitePWA } from 'vite-plugin-pwa';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import manifest from './public/manifest.json';

const isDev = process.env.NODE_ENV === 'development';

const pwaOptions: Partial<VitePWAOptions> = {
    registerType: 'prompt',
    includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
    manifest: manifest as Partial<ManifestOptions>,
    srcDir: 'src',
    filename: 'service-worker.ts',
    strategies: 'injectManifest',
};

if (isDev) {
    pwaOptions.injectManifest = {
        minify: false,
        enableWorkboxModulesLogs: true,
    };
    pwaOptions.devOptions = {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
    };
}

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        solid(),
        lucidePreprocess(),
        tailwindcss(),
        VitePWA(pwaOptions),
    ],
    worker: {
        plugins: () => [tsconfigPaths()],
    },
    server: {
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'credentialless',
        },
    },
    test: {
        environment: 'jsdom',
        include: ['src/**/*.test.{ts,tsx}'],
    },
});
