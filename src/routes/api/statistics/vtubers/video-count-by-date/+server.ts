import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '../../../types';

export type VtuberVideoCountByDateResponse = BaseAPIResponse & {
	data: VtuberVideoCountByDateResponseData[];
};

export type VtuberVideoCountByDateResponseData = {
	day: number;
	hour: number;
	count: number;
};

export const GET = (async ({ url }) => {
	const queries = ['hourly', 'daily'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');
	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/vtubers/video-count-by-date?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
