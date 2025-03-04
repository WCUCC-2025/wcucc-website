import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import qwikdev from '@qwikdev/astro';
import vercel from '@astrojs/vercel/static';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	site: 'https://2025.wcucc.com/',
	integrations: [
		tailwind(),
		qwikdev(),
		mdx({
			// Enable full Markdown support
			remarkPlugins: [],
			rehypePlugins: [],
			// Set to true to enable GitHub-flavored Markdown
			gfm: true,
		}),
	],
});
