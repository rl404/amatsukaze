import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 7
	}
};

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/vtubers/average-active-time`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=604800, s-maxage=604800, stale-while-revalidate=604800'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
