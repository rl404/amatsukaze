import type { PageLoad } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers/images`);
	return await resp.json();
}) satisfies PageLoad;
