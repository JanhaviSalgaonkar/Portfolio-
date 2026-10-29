import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Set base to '/<repo-name>/' ONLY when deploying to GitHub Pages project sites.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    minify: 'esbuild',      // minifies JS
    cssMinify: true,        // minifies CSS
    rollupOptions: { output: { manualChunks: { react: ['react', 'react-dom'] } } }
  }
});
