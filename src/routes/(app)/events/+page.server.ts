import { SHIMAKAZE_HOST } from '$env/static/private';
import { parseMonth } from '$lib/utils';
import type { vtubersResponse } from '../../api/vtubers/+server';
import type { PageServerLoad } from './$types';

export type eventResponse = {
	birthday: vtubersResponse;
	anniversary: vtubersResponse;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async ({ url }) => {
	const month = parseMonth(url.searchParams.get('month'));
	const [birthdayResp, anniversaryResp] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_birthday_month=${month}&end_birthday_month=${month}&exclude_retired=true&limit=-1`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_debut_month=${month}&end_debut_month=${month}&exclude_retired=true&limit=-1`)
	]);
	if (!birthdayResp || !anniversaryResp) return;
	return {
		birthday: await birthdayResp.json(),
		anniversary: await anniversaryResp.json()
	};
}) satisfies PageServerLoad;
