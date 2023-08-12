import groq from 'groq';
import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import type { Education } from '$lib/config/sanity/schemas';
import type { Resolved } from '$lib/config/sanity/schemas/types';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const { education } = await getSanityServerClient(previewMode).fetch<{
    education: (Education & { school: Resolved<Education['school']> })[];
  }>(groq`
    {
      'education': *[_type == "education"] { ..., school-> } | order(startDate desc, _updatedAt desc),
    }
  `);

  return {
    previewMode,
    initialData: {
      education: overlayDrafts(education)
    },
    seo: {
      title: 'Education | Jake Brazelton',
      description:
        'Education that Jake Brazelton has acquired, including degrees, certifications, and courses.',
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}/about/education`
    }
  };
}) satisfies PageServerLoad;
