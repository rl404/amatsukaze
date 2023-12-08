import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export type profileResponse = {
	status: number;
	message: string;
	data: {
		id: number;
		username: string;
	};
};

export const GET = (async ({ request }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/user`, {
		method: 'get',
		headers: { Authorization: request.headers.get('authorization') || '' }
	});
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' },
		status: resp.status
	});
}) satisfies RequestHandler;
