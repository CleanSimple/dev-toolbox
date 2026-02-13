import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import lucidePreprocess from "vite-plugin-lucide-preprocess";

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [solid(), lucidePreprocess(), tailwindcss()],
})
