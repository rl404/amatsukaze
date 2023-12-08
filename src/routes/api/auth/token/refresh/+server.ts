import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export type refreshTokenResponse = {
	status: number;
	message: string;
	data: {
		access_token: string;
		refresh_token: string;
	};
};

export const POST = (async ({ request }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/auth/token/refresh`, {
		method: 'post',
		headers: { Authorization: request.headers.get('authorization') || '' }
	});
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' },
		status: resp.status
	});
}) satisfies RequestHandler;
