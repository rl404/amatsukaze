import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '$lib/types';
import type { RequestHandler } from './$types';

export type CallbackResponse = BaseAPIResponse & {
	data: {
		access_token: string;
		refresh_token: string;
	};
};

export const POST = (async ({ request }) => {
	const { code } = await request.json();
	const resp = await fetch(`${SHIMAKAZE_HOST}/auth/callback`, {
		method: 'post',
		body: JSON.stringify({ code: code })
	});
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
