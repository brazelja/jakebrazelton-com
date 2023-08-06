import groq from 'groq';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { User } from '$lib/config/sanity/schemas';
import { spotifyClient } from '$lib/server/spotify/client';
import { githubClient } from '$lib/server/github/client';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const { user } = await getSanityServerClient(previewMode).fetch<{
    user: Pick<User, 'interests'>;
  }>(groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0] { interests },
    }
  `);

  return {
    previewMode,
    initialData: {
      user
    },
    topArtists: await spotifyClient.getArtists(),
    repositories: await githubClient.getStarredRepos()
  };
}) satisfies PageServerLoad;
