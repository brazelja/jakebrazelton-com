import groq from 'groq';
import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

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
    },
    seo: {
      title: 'Skills | Jake Brazelton',
      description:
        'Skills that Jake Brazelton has acquired, including qualifications, programming languages, frameworks, and tools.',
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}/about/skills`
    }
  };
}) satisfies PageServerLoad;
