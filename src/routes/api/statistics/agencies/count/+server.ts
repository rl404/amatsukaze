import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/agencies/count`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
