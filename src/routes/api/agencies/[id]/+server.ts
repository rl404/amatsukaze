import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '$lib/types';
import type { RequestHandler } from './$types';

export type AgencyResponse = BaseAPIResponse & {
	data: AgencyResponseData;
};

export type AgencyResponseData = {
	id: number;
	name: string;
	image: string;
	member: number;
	subscriber: number;
	updated_at: Date;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/agencies/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
