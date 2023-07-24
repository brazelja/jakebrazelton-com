import { env } from '$env/dynamic/private';
import { createClient } from '@sanity/client';

import { sanityConfig } from './config';
import type { SanityDocument } from 'sanity';

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: env.SANITY_API_READ_TOKEN || env.SANITY_API_WRITE_TOKEN || ''
});
export const client = createClient(sanityConfig);
export const getSanityServerClient = (usePreview: boolean) => (usePreview ? previewClient : client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function overlayDrafts<T extends SanityDocument>(docs: T[]): T[] {
  const documents = docs || [];
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error('Ensure that `_id` is included in query projection');
    }

    const isDraft = doc._id.startsWith('drafts.');
    const id = isDraft ? doc._id.slice(7) : doc._id;
    return isDraft || !map.has(id) ? map.set(id, doc) : map;
  }, new Map());

  return Array.from(overlayed.values());
}
