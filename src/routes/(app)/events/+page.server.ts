import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { VtubersResponse } from '../../api/vtubers/+server';
import type { PageServerLoad } from './$types';

export type EventResponse = {
	month: string;
	birthday: VtubersResponse;
	anniversary: VtubersResponse;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const month = (new Date().getMonth() + 1).toString();
	const [birthdayResp, anniversaryResp] = await Promise.all([
		await fetch(
			`${SHIMAKAZE_HOST}/vtubers?mode=simple&start_birthday_month=${month}&end_birthday_month=${month}&exclude_retired=true&limit=-1`
		),
		await fetch(
			`${SHIMAKAZE_HOST}/vtubers?mode=simple&start_debut_month=${month}&end_debut_month=${month}&exclude_retired=true&limit=-1`
		)
	]);
	return {
		month: month,
		birthday: handleAPIResponse(birthdayResp),
		anniversary: handleAPIResponse(anniversaryResp)
	};
}) satisfies PageServerLoad;
