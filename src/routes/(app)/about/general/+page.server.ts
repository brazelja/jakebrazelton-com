import groq from 'groq';

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
    }
  };
}) satisfies PageServerLoad;
