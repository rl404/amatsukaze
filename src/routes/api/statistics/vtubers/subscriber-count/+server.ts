import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

type vtuberSubscriberCountResponse = {
	status: number;
	message: string;
	data: {
		min: number;
		max: number;
		count: number;
	};
};

export const GET = (async ({ url }) => {
	const queries = ['interval', 'max'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');

	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/vtubers/subscriber-count?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
