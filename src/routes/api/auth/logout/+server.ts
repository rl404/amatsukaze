import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/auth/logout`, {
		method: 'post',
		headers: { Authorization: request.headers.get('authorization') || '' }
	});
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' },
		status: resp.status
	});
}) satisfies RequestHandler;
