export const ssr = false;

import { dev } from '$app/environment';
import { VERCEL_URL } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    seo: {
      title: 'Studio | Jake Brazelton',
      description: 'Sanity Studio for editing content on the website.',
      image: `${dev ? 'http' : 'https'}://${VERCEL_URL}/android-chrome-512x512.png`,
      url: `${dev ? 'http' : 'https'}://${VERCEL_URL}/studio`
    }
  };
}
