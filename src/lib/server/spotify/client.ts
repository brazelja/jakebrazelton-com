import z from 'zod';

import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

const SPOTIFY_AUTHORIZATION_API_URL = 'https://accounts.spotify.com/api/token';

const SpotifyAuthenticationResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number()
});

let accessToken = '';
let expiresAt = Math.floor(Date.now() / 1000);

const authenticate = async () => {
  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const { access_token, expires_in } = await fetch(SPOTIFY_AUTHORIZATION_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then((res) => res.json())
    .then(SpotifyAuthenticationResponseSchema.parse);

  accessToken = access_token;
  expiresAt = Math.floor(Date.now() / 1000) + expires_in;
};

const TOP_ARTISTS = [
  '0FZcPgWI3BsFQl4rOAGSHT', // Make Them Suffer
  '19I4tYiChJoxEO5EuviXpz', // AFI
  '21Gcs1QTxaZxwNJls2OZs7', // Four Fists
  '3hyGGjxu73JuzBa757H6R5', // The Mountain Goats
  '3AA28KZvwAUcZuOKwyblJQ', // Gorillaz
  '6xG7V5GWf6QWQu1EFL3WJ8', // Royal Coda
  '6vXYoy8ouRVib302zxaxFF', // Lorna Shore
  '3ZztVuWxHzNpl0THurTFCv', // Architects
  '1TJbmc7jTpw78GKCiMpvDh', // Blue October
  '6P5ccCJCe8A4s9tDSTNFzF' // Fleshwater
];

const SpotifyGetArtistsResponseSchema = z.object({
  artists: z.array(
    z.object({
      external_urls: z.object({
        spotify: z.string()
      }),
      followers: z.object({
        href: z.nullable(z.string()),
        total: z.number()
      }),
      genres: z.array(z.string()),
      href: z.string(),
      id: z.string(),
      images: z.array(
        z.object({
          height: z.number(),
          url: z.string(),
          width: z.number()
        })
      ),
      name: z.string(),
      popularity: z.number(),
      type: z.string(),
      uri: z.string()
    })
  )
});

export const spotifyClient = {
  getArtists: async () => {
    if (expiresAt <= Math.floor(Date.now() / 1000)) await authenticate();

    const res = await fetch(`https://api.spotify.com/v1/artists?ids=${TOP_ARTISTS.join(',')}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) throw new Error(res.statusText);

    return res
      .json()
      .then(SpotifyGetArtistsResponseSchema.parse)
      .then((data) => data.artists);
  }
};
