import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			borderRadius: {
				ms: '0.250rem'
			},
			// screens: {
			//     sml: { max: '640px' },
			//     med: { max: '768px' },
			//     lrg: { max: '1024px' },
			//     xtl: { max: '1280px' },
			// },
			colors: {
				'wcucc-yellow': '#F7B801',
				'wcucc-lavender': '#7678ED',
				'wcucc-purple': '#3D348B',
				'wcucc-coral': {
					50: '#fef5ec',
					100: '#fdebd8',
					200: '#f9cfae',
					300: '#f5a77a',
					400: '#f17f55',
					500: '#ec4b22',
					600: '#dc2c18',
					700: '#b61616',
					800: '#931a22',
					900: '#771822',
					content: '#420a14',
					bg: '#fee6a9',
				},
				'wcucc-pine': '#077364',
				'wcucc-sky': '#1B98F2',
				'purple-lavender': '#CC6300',
				'forest-green': '#052900'
			},
		},
	},
	darkMode: 'class',
	corePlugins: {
		preflight: false,
		// We disable those because they add stuff to the CSS file even when unused
		filter: false,
		backdropFilter: false,
		ringWidth: false,
		ringColor: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		boxShadow: true,
		transform: true,
		touchAction: false,
		scrollSnapType: false,
		borderColor: true, // If we don't disable this, Tailwind will apply a default border color to all the elements
		borderOpacity: false,
		textOpacity: false,
		textDecoration: true,
		// Things we might need in the future but disable for now as they also add stuff
		// fontVariantNumeric: false,
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/container-queries'),
		plugin(({ addBase, theme }) => {
			addBase({
				// Small reset, preflight include a lot of stuff we don't use so let's make our own
				'*, ::before, ::after': {
					boxSizing: 'border-box',
				},
				html: {
					fontSize: '17px',
					lineHeight: '1.5',
					// '@apply text-light-text': {},
				},

				body: {
					'@apply min-h-screen w-full': {},
				},

				'body, dl, dd, p': {
					margin: '0',
				},

				':root': {
					'-moz-tab-size': '4',
					tabSize: '4',
				},

				a: {
					textDecoration: 'none',
					fontWeight: '500',
					transition: 'color .15s',
					'&:hover': {
						textDecoration: 'underline',
						textUnderlinePosition: 'from-font',
						textDecorationThickness: '2px',
					},
					// '@apply text-link-color dark:text-dark-link-color': {},
				},

				'h1, h2, h3, h4': {
					letterSpacing: '-.01em',
					fontWeight: '550',
				},

				dt: { fontWeight: 'bold' },

				'dd:not(:last-of-type)': {
					marginBottom: '1rem',
				},

				// Articles
				article: {
					marginBottom: '3rem',
				},

				'article p, p, ul, pre, blockquote': {
					marginBottom: '1em',
				},

				'h1, h2': {
					margin: '0',
				},

				h3: {
					margin: '0',
				},

				'li>p': {
					marginBottom: '.6rem',
				},

				blockquote: {
					paddingTop: '0.5rem',
					paddingBottom: '0.5rem',
					paddingLeft: '1rem',
					borderLeft: '5px solid',
					borderColor: '#35363A',
					backgroundColor: '#D4D4D8',
					borderRadius: theme('borderRadius.md'),
					fontStyle: 'italic',
					fontWeight: '450',
					marginLeft: '0',
					marginRight: '0',
					'@apply sm:mx-5 dark:bg-zinc-900': {},
					'& p:last-child': {
						marginBottom: '0',
					},
				},

				figure: {
					marginTop: '1.4rem',
					marginBottom: '1rem',
					textAlign: 'center',
					'@apply sm:mx-8 mx-0': {},
				},

				img: {
					maxWidth: '100%',
					height: 'auto',
					borderRadius: theme('borderRadius.md'),
				},

				figcaption: {
					textAlign: 'center',
					display: 'block',
					margin: '.15rem 0',
					fontStyle: 'italic',
					fontSize: '.95rem',
					'@apply text-zinc-600 dark:text-zinc-400': {},
				},

				iframe: {
					margin: '0 auto 1rem',
					display: 'block',
				},
			});
		}),
	],
};

export default config;
