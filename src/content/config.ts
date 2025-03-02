import { z, defineCollection } from 'astro:content';

const guidelinesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		icon: z.string(),
		bgColor: z.string(),
	}),
});

const deadlinesCollection = defineCollection({
	type: 'data',
	schema: z.object({
		type: z.enum(['E', 'R']),
		title: z.string(),
		startTime: z.string().datetime({ local: true }),
		endTime: z.string().datetime({ local: true }),
		calendarObject: z.object({
			id: z.string(),
			title: z.string(),
			description: z.string(),
			location: z.string(),
			startTime: z.string().datetime({ local: true }),
			endTime: z.string().datetime({ local: true }),
		}),
		description: z.string(),
		detailsLink: z.string(),
	}),
});

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
			isTBD: z.boolean(),
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
		abstract: z.string(),
	}),
});

export const collections = {
	bios: biosCollection,
	carousel: carouselCollection,
	sponsors: sponsorsCollection,
	faqs: faqsCollection,
	speakers: speakersCollection,
	eventsInfo: eventsInfoCollection,
	deadlines: deadlinesCollection,
	guidelines: guidelinesCollection,
};
