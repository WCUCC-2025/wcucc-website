import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import qwikdev from '@qwikdev/astro';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    site: 'https://2025.wcucc.com/',
    integrations: [tailwind(), qwikdev()],
});
