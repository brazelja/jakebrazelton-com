import groq from 'groq';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { Skills } from '$lib/config/sanity/schemas';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const { skills } = await getSanityServerClient(previewMode).fetch<{
    skills: Skills;
  }>(groq`
    {
      'skills': *[_type == "skills"] | order(_updatedAt desc) [0],
    }
  `);

  return {
    previewMode,
    initialData: {
      skills
    }
  };
}) satisfies PageServerLoad;
