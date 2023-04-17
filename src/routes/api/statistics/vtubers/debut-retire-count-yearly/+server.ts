import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

type vtuberDebutRetireCountYearlyResponse = {
	status: number;
	message: string;
	data: Array<vtuberDebutRetireCountYearlyResponseData>;
};

export type vtuberDebutRetireCountYearlyResponseData = {
	year: number;
	debut: number;
	retire: number;
};

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/vtubers/debut-retire-count-yearly`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;