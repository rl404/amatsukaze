import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers?page=1&limit=24`);
	return await resp.json();
}) satisfies PageServerLoad;
