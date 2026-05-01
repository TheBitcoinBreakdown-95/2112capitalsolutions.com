import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Bitcoin', 'AI', 'Privacy', 'Self-hosting']),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
