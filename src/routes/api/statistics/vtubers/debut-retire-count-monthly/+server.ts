import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
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

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 7
	}
};

export const GET = (async () => {
	const resp = await fetch(`${env.SHIMAKAZE_HOST}/statistics/vtubers/debut-retire-count-monthly`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=604800, s-maxage=604800, stale-while-revalidate=604800'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
