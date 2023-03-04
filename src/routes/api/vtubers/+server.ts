import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { RequestHandler } from './$types';
import type { vtuberResponseData } from './[id]/+server';

export type vtubersResponse = {
	status: number;
	message: string;
	data: Array<vtuberResponseData>;
	meta: { page: number; limit: number; total: number };
};

export const GET = (async ({ url }) => {
	const page = url.searchParams.get('page');
	const limit = url.searchParams.get('limit');

	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers?page=${page}&limit=${limit}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' },
		status: resp.status
	});
}) satisfies RequestHandler;
