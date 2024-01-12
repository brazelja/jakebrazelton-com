import groq from 'groq';
import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { Interests } from '$lib/config/sanity/schemas';
import { spotifyClient } from '$lib/server/spotify/client';
import { githubClient } from '$lib/server/github/client';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { previewMode } = await parent();

  const interests = await getSanityServerClient(previewMode).fetch<Interests>(
    groq`*[_type == "interests"] | order(_updatedAt desc)[0]`
  );

  return {
    previewMode,
    initialData: {
      interests
    },
    topArtists: spotifyClient.getArtists(),
    repositories: githubClient.getStarredRepos(),

    seo: {
      title: 'Interests | Jake Brazelton',
      description:
        "Jake Brazelton's interests, including music, starred repositories, books, video games, comics, and horror movies.",
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}/about/interests`
    }
  };
}) satisfies PageServerLoad;
