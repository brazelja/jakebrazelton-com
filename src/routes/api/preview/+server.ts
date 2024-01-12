import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import { setPreviewCookie } from '$lib/utils/preview-cookies';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
  const allParams = url.searchParams;
  const secret = env.VITE_SANITY_PREVIEW_SECRET;
  const incomingSecret = allParams.get('secret');
  const type = allParams.get('type');

  // Check the secret.
  if (secret !== incomingSecret) error(401, 'Invalid secret');

  // Check if we have a type parameter.
  if (!type) error(401, 'Missing type');

  // Default redirect.
  let redirectPath = '/';
  let isPreviewing = false;

  // Our query may vary depending on the type.
  if (['user', 'experience', 'education', 'project'].includes(type)) {
    isPreviewing = true;

    // Set the redirect path and append the isPreview query
    // param, so that the app knows it's a Sanity preview.
    redirectPath = `/about?isPreview=true`;
  }

  // Set the preview cookie.
  if (isPreviewing) setPreviewCookie(cookies);

  // Since this endpoint is called from the Sanity Studio on
  // every content change, we'll make sure not to cache it.
  setHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  });

  redirect(302, redirectPath);
};
