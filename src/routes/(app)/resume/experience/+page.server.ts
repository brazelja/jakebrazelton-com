import groq from 'groq';

import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import type { Experience } from '$lib/config/sanity/schemas';
import type { Resolved } from '$lib/config/sanity/schemas/types';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const { experiences } = await getSanityServerClient(previewMode).fetch<{
    experiences: (Experience & { company: Resolved<Experience['company']> })[];
  }>(groq`
    {
      'experiences': *[_type == "experience"] { ..., company-> } | order(startDate desc, _updatedAt desc),
      
    }
  `);

  return {
    previewMode,
    initialData: {
      experiences: overlayDrafts(experiences)
    }
  };
}) satisfies PageServerLoad;
