import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse, MetaAPIResponse } from '../types';
import type { RequestHandler } from './$types';
import type { VtuberResponseData } from './[id]/+server';

export type VtubersResponse = BaseAPIResponse & {
	data: VtuberResponseData[];
	meta: MetaAPIResponse;
};

export const GET = (async ({ url }) => {
	const queries = [
		'mode',
		'names',
		'name',
		'original_name',
		'nickname',
		'exclude_active',
		'exclude_retired',
		'debut_day',
		'start_debut_month',
		'end_debut_month',
		'start_debut_year',
		'end_debut_year',
		'start_retired_month',
		'end_retired_month',
		'start_retired_year',
		'end_retired_year',
		'has_2d',
		'has_3d',
		'character_designer',
		'character_2d_modeler',
		'character_3d_modeler',
		'in_agency',
		'agency',
		'agency_id',
		'channel_types',
		'birthday_day',
		'start_birthday_month',
		'end_birthday_month',
		'blood_types',
		'genders',
		'zodiacs',
		'start_subscriber',
		'end_subscriber',
		'start_video_count',
		'end_video_count',
		'sort',
		'page',
		'limit'
	]
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');

	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers?${queries}`);
	const body = await resp.json();
	return new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=21600, s-maxage=86400, stale-while-revalidate=21600'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
