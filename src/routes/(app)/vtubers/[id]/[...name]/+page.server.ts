import { SHIMAKAZE_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}`);
	return await resp.json();
}) satisfies PageServerLoad;
