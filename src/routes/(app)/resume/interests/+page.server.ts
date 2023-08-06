import { spotifyClient } from '$lib/server/spotify/client';
import { githubClient } from '$lib/server/github/client';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
  return {
    topArtists: spotifyClient.getArtists(),
    repositories: githubClient.getStarredRepos(),
    videoGames: fetch('/api/video-games').then(
      (res) => res.json() as Promise<{ name: string; image: string; url: string }[]>
    ),
    comics: fetch('/api/comics').then(
      (res) => res.json() as Promise<{ name: string; image: string; url: string }[]>
    ),
    horrorMovies: fetch('/api/horror').then(
      (res) => res.json() as Promise<{ name: string; image: string; url: string }[]>
    )
  };
}) satisfies PageServerLoad;
