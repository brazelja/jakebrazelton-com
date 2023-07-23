import { isProd } from '$lib/config/environment';

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: typeof document !== 'undefined' && isProd,
  apiVersion: '2023-07-23'
};
