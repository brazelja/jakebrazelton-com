import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async () => {
  redirect(307, '/about/general');
}) satisfies PageServerLoad;
