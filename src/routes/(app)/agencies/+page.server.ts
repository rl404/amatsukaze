import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/agencies`);
	return await resp.json();
}) satisfies PageServerLoad;
