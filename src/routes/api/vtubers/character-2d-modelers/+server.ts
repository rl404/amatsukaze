import type { RequestHandler } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export type vtuberCharacter2DModelersResponse = {
	status: number;
	message: string;
	data: Array<string>;
};

export const GET = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers/character-2d-modelers`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
