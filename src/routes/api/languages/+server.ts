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

export const GET = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/languages`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
