import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { BaseAPIResponse, MetaAPIResponse } from '../types';

export type LanguagesResponse = BaseAPIResponse & {
	data: LanguageResponseData[];
	meta: MetaAPIResponse;
};

export type LanguageResponseData = {
	id: number;
	name: string;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 7
	}
};

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/languages`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=604800, s-maxage=604800, stale-while-revalidate=604800'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
