import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import type { BaseAPIResponse } from '../../../types';

export type VtuberSubscriberCountResponse = BaseAPIResponse & {
	data: VtuberSubscriberCountResponseData[];
};

export type VtuberSubscriberCountResponseData = {
	min: number;
	max: number;
	count: number;
};

export const GET = (async ({ url }) => {
	const queries = ['interval', 'max'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');
	const resp = await fetch(`${env.SHIMAKAZE_HOST}/statistics/vtubers/subscriber-count?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=604800, s-maxage=604800, stale-while-revalidate=604800'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
