import type { RequestHandler } from './$types';
import type { agencyResponseData } from './[id]/+server';
import { SHIMAKAZE_HOST } from '$env/static/private';

export type agenciesResponse = {
	status: number;
	message: string;
	data: Array<agencyResponseData>;
};

export const GET = (async ({ url }) => {
	const queries = ['sort', 'page', 'limit'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');

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
