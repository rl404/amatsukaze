import { SHIMAKAZE_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 60 * 60
	}
};

export const load = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers?page=1&limit=36`);
	return await resp.json();
}) satisfies PageServerLoad;
