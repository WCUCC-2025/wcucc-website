import { z, defineCollection } from 'astro:content';

const biosCollection = defineCollection({
    type: 'data',
    schema: z.object({
        firstName: z.string(),
        lastName: z.string(),
        role: z.string(),
        headshot: z.string(),
        major: z.string(),
		biography: z.string(),
		funFact: z.string()
    })
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

const sponsorsCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		logo: z.string(),
		link: z.string(),
		tier: z.enum(['bronze', 'silver', 'gold', 'platinum'])	
	})
})

const faqsCollection = defineCollection({
	type: 'data',
	schema: z.object ({
		question: z.string(),
		answer: z.string()
	})
})

export const collections = {
    'bios': biosCollection,
	carousel: carouselCollection,
	'sponsors': sponsorsCollection,
	'faqs': faqsCollection,
};
