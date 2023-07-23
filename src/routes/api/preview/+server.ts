import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { setPreviewCookie } from '$lib/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
	const allParams = url.searchParams;
	const secret = env.VITE_SANITY_PREVIEW_SECRET;
	const incomingSecret = allParams.get('secret');
	const type = allParams.get('type');

	// Check the secret.
	if (secret !== incomingSecret) throw error(401, 'Invalid secret');

	// Check if we have a type parameter.
	if (!type) throw error(401, 'Missing type');

	// Default redirect.
	let redirectPath = '/';
	let isPreviewing = false;

	// Our query may vary depending on the type.
	if (type === 'user') {
		isPreviewing = true;

		// Set the redirect path and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectPath = `/resume?isPreview=true`;
	}

	// Set the preview cookie.
	if (isPreviewing) setPreviewCookie(cookies);

	// Since this endpoint is called from the Sanity Studio on
	// every content change, we'll make sure not to cache it.
	setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
	});

	throw redirect(302, redirectPath);
};
