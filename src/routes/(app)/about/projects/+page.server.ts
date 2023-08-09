import groq from 'groq';

import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import type { Project } from '$lib/config/sanity/schemas';
import type { Resolved } from '$lib/config/sanity/schemas/types';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const { projects } = await getSanityServerClient(previewMode).fetch<{
    projects: (Project & { company: Resolved<Project['company']> })[];
  }>(groq`
    {
      'projects': *[_type == "project"] { ..., company-> } | order(startDate desc, _updatedAt desc)
    }
  `);

  return {
    previewMode,
    initialData: {
      projects: overlayDrafts(projects)
    }
  };
}) satisfies PageServerLoad;
