import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import lucidePreprocess from "vite-plugin-lucide-preprocess";

export default defineConfig({
  plugins: [solid(), lucidePreprocess()],
})
