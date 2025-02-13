import { z, defineCollection } from 'astro:content';

const eventsInfoCollection = defineCollection({
	type: 'data',
	schema: z.object({
		category: z.string(),
		title: z.string(),
		startTime: z.string().datetime({ local: true }),
		endTime: z.string().datetime({ local: true }),
		speaker: z.optional(
			z.object({
				name: z.string(),
				website: z.string(),
			})
		),
		location: z.object({
			onCampus: z.boolean(),
			street: z.string(),
			postalCode: z.string(),
			map: z.optional(z.string()), // ONLY FOR OFF-CAMPUS LOCATIONS
			buildingCode: z.optional(z.string()),
			room: z.optional(z.string()),	
		}),
		calendarDescription: z.string(),
		websiteDescription: z.string(),
		isColored: z.boolean(),
	}),
});

const biosCollection = defineCollection({
	type: 'data',
	schema: z.object({
		order: z.number(),
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

const speakersCollection = defineCollection({
	type: 'data',
	schema: z.object({
		firstName: z.string(),
		lastName: z.string(),
		institution: z.optional(z.string()),
		department: z.optional(z.string()),
		position: z.string(),
		linkToMoreInformation: z.string(),
		photograph: z.string(),
		talkTitle: z.string(),
		biography: z.string(),
	}),
});

export const collections = {
	bios: biosCollection,
	carousel: carouselCollection,
	sponsors: sponsorsCollection,
	faqs: faqsCollection,
	events: eventsCollection,
	speakers: speakersCollection,
	eventsInfo: eventsInfoCollection 
};
