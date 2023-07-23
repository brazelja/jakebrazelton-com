/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 * It's imported in `sanity.config.ts´ and used as a component in the defaultDocumentNode function.
 */
import React from 'react';
import { Card } from '@sanity/ui';

export function ResumePreview(props: { document: any }) {
	return (
		<Card scheme="light" style={{ width: '100%', height: '100%' }}>
			<iframe style={{ width: '100%', height: '100%' }} src={getUrl(props)} />
		</Card>
	);
}

function getUrl({ document }) {
	const url = new URL('/api/preview', location.origin);
	const secret = import.meta.env.VITE_SANITY_PREVIEW_SECRET;

	if (secret) url.searchParams.set('secret', secret);

	url.searchParams.set('type', document.displayed._type);

	// Needed to break the cache.
	url.searchParams.set('random', Math.random().toString(36).substring(7));

	return url.toString();
}
