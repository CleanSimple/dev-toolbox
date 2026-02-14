import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import lucidePreprocess from "vite-plugin-lucide-preprocess";
import tailwindcss from '@tailwindcss/vite';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import manifest from './public/manifest.json';

const isDev = process.env.NODE_ENV === 'development';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
  manifest: manifest as any,
  srcDir: 'src',
  filename: 'service-worker.ts',
  strategies: 'injectManifest',
}

if (isDev) {
  pwaOptions.injectManifest = {
    minify: false,
    enableWorkboxModulesLogs: true,
  }
  pwaOptions.devOptions = {
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  }
}

export default defineConfig({
  plugins: [
    solid(),
    lucidePreprocess(),
    tailwindcss(),
    VitePWA(pwaOptions)
  ],
})
