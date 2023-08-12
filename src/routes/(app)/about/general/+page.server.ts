import groq from 'groq';
import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { User } from '$lib/config/sanity/schemas';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const { user } = await getSanityServerClient(previewMode).fetch<{
    user: Pick<User, 'email' | 'phone' | 'links' | 'languages' | 'bio'>;
  }>(groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0] {
        email,
        phone,
        links,
        languages,
        bio
      },
    }
  `);

  return {
    previewMode,
    initialData: {
      user
    },
    seo: {
      title: 'About | Jake Brazelton',
      description:
        'General information about Jake Brazelton, including contact information, links, and languages.',
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}/about/general`
    }
  };
}) satisfies PageServerLoad;
