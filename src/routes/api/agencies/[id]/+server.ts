import type { RequestHandler } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export type agencyResponse = {
	status: number;
	message: string;
	data: agencyResponseData;
};

export type agencyResponseData = {
	id: number;
	name: string;
	image: string;
	updated_at: Date;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/agencies/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
