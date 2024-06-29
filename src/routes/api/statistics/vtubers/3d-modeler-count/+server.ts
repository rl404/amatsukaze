import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '../../../types';

export type Vtuber3DModelerCountResponse = BaseAPIResponse & {
	data: Vtuber3DModelerCountResponseData[];
};

export type Vtuber3DModelerCountResponseData = {
	name: string;
	count: number;
};

export const GET = (async ({ url }) => {
	const queries = ['top'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');
	const resp = await fetch(`${SHIMAKAZE_HOST}/statistics/vtubers/3d-modeler-count?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
