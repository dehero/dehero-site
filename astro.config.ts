import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { LANGUAGE_DESCRIPTORS, validateLanguage } from './src/entities/languages';
import icon from 'astro-icon';
import remarkGfm from 'remark-gfm';

const language = validateLanguage(process.env.LANGUAGE);

export default defineConfig({
  site: LANGUAGE_DESCRIPTORS[language].site,
  integrations: [
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [remarkGfm],
      gfm: true,
      extendMarkdownConfig: false,
    }),
    icon(),
  ],
  trailingSlash: 'always',
  prefetch: true,
  output: import.meta.env.DEV ? 'server' : 'static',
});
