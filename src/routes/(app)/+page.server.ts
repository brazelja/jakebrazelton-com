import groq from 'groq';

import { getSanityServerClient } from '$lib/config/sanity/client';
import type { User } from '$lib/config/sanity/schemas';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const user = await getSanityServerClient(false).fetch<User>(groq`
    *[_type == "user"][0]
  `);

  return {
    user
  };
}
