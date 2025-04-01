import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './docs' }),
  schema: () =>
    z.object({
      metaTitle: z.optional(z.string().or(z.record(z.string(), z.string()))),
      description: z.optional(z.string().or(z.record(z.string(), z.string()))),
      started: z.coerce.date().optional(),
      published: z.coerce.date().optional(),
      finished: z.coerce.date().optional(),
      links: z.array(z.string()).optional(),
    }),
});

export const collections = { docs };
