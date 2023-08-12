import groq from 'groq';
import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { User } from '$lib/config/sanity/schemas';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const user = await getSanityServerClient(false).fetch<User>(groq`
    *[_type == "user"][0]
  `);

  return {
    user,
    seo: {
      title: 'Jake Brazelton | Software Developer',
      description:
        'Personal website for Jake Brazelton, a full-stack developer from Harrisonburg, VA.',
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}`
    }
  };
}
