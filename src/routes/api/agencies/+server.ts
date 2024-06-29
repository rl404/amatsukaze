import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { AgencyResponseData } from './[id]/+server';
import type { BaseAPIResponse, MetaAPIResponse } from '../types';

export type AgenciesResponse = BaseAPIResponse & {
	data: AgencyResponseData[];
	meta: MetaAPIResponse;
};

export const GET = (async ({ url }) => {
	const queries = ['sort', 'page', 'limit']
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');
	const resp = await fetch(`${SHIMAKAZE_HOST}/agencies?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
