import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',

  schema: () =>
    z.object({
      title: z.string().optional(),
      metaTitle: z.string().optional(),
      description: z.string().optional(),
      started: z.coerce.date().optional(),
      published: z.coerce.date().optional(),
      finished: z.coerce.date().optional(),
      links: z.array(z.string()).optional(),
    }),
});

export const collections = { docs };
