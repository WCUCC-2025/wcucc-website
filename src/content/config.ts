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
		linkedIn: z.string(),
		funFact: z.string(),
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
		buttonLink: z.string(),
	}),
});

const sponsorsCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		logo: z.string(),
		link: z.string(),
		tier: z.enum(['bronze', 'silver', 'gold', 'platinum']),
	}),
});

const faqsCollection = defineCollection({
	type: 'data',
	schema: z.object({
		question: z.string(),
		answer: z.string(),
	}),
});

const eventsCollection = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		startTime: z.string(),
		endTime: z.string(),
		speaker: z.optional(z.string()),
		location: z.optional(z.string()),
		color: z.optional(z.string()),
		description: z.optional(z.string()),
	}),
});

export const collections = {
	bios: biosCollection,
	carousel: carouselCollection,
	sponsors: sponsorsCollection,
	faqs: faqsCollection,
	events: eventsCollection,
};
