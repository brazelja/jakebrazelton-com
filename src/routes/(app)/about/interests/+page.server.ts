import { spotifyClient } from '$lib/server/spotify/client';
import { githubClient } from '$lib/server/github/client';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
  return {
    topArtists: spotifyClient.getArtists(),
    repositories: githubClient.getStarredRepos(),
    videoGames: fetch('/api/video-games').then<{ name: string; image: string; url: string }[]>(
      (res) => res.json() 
    ),
    books: fetch('/api/books').then<{ name: string; author: string; image: string; url: string }[]>(
      (res) => res.json() 
    ),
    comics: fetch('/api/comics').then<{ name: string; image: string; url: string }[]>(
      (res) => res.json() 
    ),
    horrorMovies: fetch('/api/horror').then<{ name: string; image: string; url: string }[]>(
      (res) => res.json() 
    )
  };
}) satisfies PageServerLoad;
