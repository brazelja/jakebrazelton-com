import groq from 'groq';
import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

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
    },
    seo: {
      title: 'Projects | Jake Brazelton',
      description: 'Projects that Jake Brazelton has worked on, both professional and personal.',
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}/about/projects`
    }
  };
}) satisfies PageServerLoad;
