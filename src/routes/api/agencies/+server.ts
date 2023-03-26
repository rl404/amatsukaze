import type { RequestHandler } from './$types';
import type { agencyResponseData } from './[id]/+server';
import { SHIMAKAZE_HOST } from '$env/static/private';

export type agenciesResponse = {
	status: number;
	message: string;
	data: Array<agencyResponseData>;
};

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/agencies`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
