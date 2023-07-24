import groq from 'groq';

import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import type { Education, Experience, Project, User } from '$lib/config/sanity/schemas';
import type { Resolved } from '$lib/config/sanity/schemas/types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const { previewMode } = await parent();

  const { user, experiences, education, projects } = await getSanityServerClient(previewMode)
    .fetch<{
    user: User;
    experiences: (Experience & { company: Resolved<Experience['company']> })[];
    education: Education[];
    projects: (Project & { company: Resolved<Project['company']> })[];
  }>(groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0],
      'experiences': *[_type == "experience"] { ..., company-> } | order(startDate desc, _updatedAt desc),
      'education': *[_type == "education"] | order(startDate desc, _updatedAt desc),
      'projects': *[_type == "project"] { ..., company-> } | order(startDate desc, _updatedAt desc)
    }
  `);

  return {
    previewMode,
    initialData: {
      user,
      experiences: overlayDrafts(experiences),
      education: overlayDrafts(education),
      projects: overlayDrafts(projects)
    }
  };
}
