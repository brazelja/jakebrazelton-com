import adapter from '@sveltejs/adapter-vercel';
import sequence from 'svelte-sequential-preprocessor';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { preprocessMeltUI } from '@melt-ui/pp';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      '$components/*': 'src/lib/components/*'
    }
  }
};

export default config;
