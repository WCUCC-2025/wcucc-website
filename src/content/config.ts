import { z, defineCollection } from 'astro:content';

const biosCollection = defineCollection({
    type: 'content',
    schema: z.object({
        firstName: z.string(),
        lastName: z.string(),
        role: z.string(),
        headshotUrl: z.string(),
        major: z.string(),
    }),
});

const carouselCollection = defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      mainImage: z.string(),
      secondaryImage: z.string(),
      alt: z.string(),
      buttonLink: z.string()
    })
  })

export const collections = {
    bios: biosCollection,
	carousel: carouselCollection,
};
