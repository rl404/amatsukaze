import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const queries = ['query', 'user_id', 'sort', 'page', 'limit']
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');
	const resp = await fetch(`${SHIMAKAZE_HOST}/tier-lists?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

export const PUT = (async ({ request }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/tier-lists`, {
		method: 'put',
		headers: { Authorization: request.headers.get('authorization') || '' },
		body: JSON.stringify(await request.json())
	});
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
