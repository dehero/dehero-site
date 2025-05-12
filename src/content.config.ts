import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './docs' }),
  schema: ({ image }) =>
    z.object({
      description: z.optional(z.string().or(z.record(z.string(), z.string()))),
      metaTitle: z.optional(z.string().or(z.record(z.string(), z.string()))),
      metaDescription: z.optional(z.string().or(z.record(z.string(), z.string()))),
      started: z.coerce.date().optional(),
      published: z.coerce.date().optional(),
      finished: z.coerce.date().optional(),
      links: z.array(z.string()).optional(),
      icon: image().optional(),
      updateFrequency: z.number().optional(),
    }),
});

export const collections = { docs };
