import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { LANGUAGE_DESCRIPTORS, validateLanguage } from './src/entites/languages';

const language = validateLanguage(process.env.LANGUAGE);

export default defineConfig({
  site: LANGUAGE_DESCRIPTORS[language].site,
  integrations: [
    mdx({
      syntaxHighlight: false,
    }),
  ],
  trailingSlash: 'always',
  prefetch: true,
  output: import.meta.env.DEV ? 'server' : 'static',
});
