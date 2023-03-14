import type { RequestHandler } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { agencyResponseData } from './[id]/+server';

export type agenciesResponse = {
	status: number;
	message: string;
	data: Array<agencyResponseData>;
};

export const GET = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/agencies`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
