import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { vtuberResponseData } from './[id]/+server';

export type vtubersResponse = {
	status: number;
	message: string;
	data: Array<vtuberResponseData>;
	meta: { page: number; limit: number; total: number };
};

export const GET = (async ({ url }) => {
	const queries = [
		'names',
		'name',
		'original_name',
		'nickname',
		'exclude_active',
		'exclude_retired',
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
		'sort',
		'page',
		'limit'
	]
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');

	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=3600, stale-while-revalidate=3600'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
