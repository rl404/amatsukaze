import { SHIMAKAZE_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/agencies`);
	return await resp.json();
}) satisfies PageServerLoad;
