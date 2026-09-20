import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import type { BaseAPIResponse } from '../../../types';

export type VtuberDesignerCountResponse = BaseAPIResponse & {
	data: VtuberDesignerCountResponseData[];
};

export type VtuberDesignerCountResponseData = {
	name: string;
	count: number;
};

export const GET = (async ({ url }) => {
	const queries = ['top'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');
	const resp = await fetch(`${env.SHIMAKAZE_HOST}/statistics/vtubers/designer-count?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=604800, s-maxage=604800, stale-while-revalidate=604800'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
