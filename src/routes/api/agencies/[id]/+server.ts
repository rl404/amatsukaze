import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '../../types';
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
	updated_at: string;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 7
	}
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/agencies/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=604800, s-maxage=604800, stale-while-revalidate=604800'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
