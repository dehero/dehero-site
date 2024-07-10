import vike from 'vike/plugin';
import vikeSolid from 'vike-solid/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  plugins: [
    // TODO: add sitemap after https://github.com/vikejs/vike/issues/1451 gets resolved
    vike({ prerender: true, trailingSlash: true }),
    vikeSolid(),
  ],
  server: {
    port: 1200,
  },
  build: {
    target: 'esnext',
    outDir: '../../dist',
    emptyOutDir: true,
    minify: true,
  },
});
