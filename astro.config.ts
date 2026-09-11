import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { LANGUAGE_DESCRIPTORS, validateLanguage } from './src/entities/languages';
import icon from 'astro-icon';
import remarkGfm from 'remark-gfm';
import { unified } from '@astrojs/markdown-remark';

const language = validateLanguage(process.env.LANGUAGE);

export default defineConfig({
  site: LANGUAGE_DESCRIPTORS[language].site,
  integrations: [
    mdx({
      syntaxHighlight: false,
       gfm: true,
       extendMarkdownConfig: false,
    }),
    icon(),
  ],
  trailingSlash: 'always',
  prefetch: true,
  markdown: {
    processor: unified({ remarkPlugins: [remarkGfm] }),
  },
  output: import.meta.env.DEV ? 'server' : 'static',
});
