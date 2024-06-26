import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '../../../types';

export type VtuberDebutRetireCountMonthlyResponse = BaseAPIResponse & {
	data: VtuberDebutRetireCountMonthlyResponseData;
};

export type VtuberDebutRetireCountMonthlyResponseData = {
	year: number;
	month: number;
	debut: number;
	retire: number;
};

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/vtubers/debut-retire-count-monthly`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
