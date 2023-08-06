import groq from 'groq';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { User } from '$lib/config/sanity/schemas';

import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, route }) => {
  if (route.id === '/(app)/resume') throw redirect(307, '/resume/general');

  const { previewMode } = await parent();

  const { user } = await getSanityServerClient(previewMode).fetch<{
    user: User;
  }>(groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0] { name, title, picture },
    }
  `);

  return {
    previewMode,
    initialData: {
      user
    }
  };
}) satisfies LayoutServerLoad;
