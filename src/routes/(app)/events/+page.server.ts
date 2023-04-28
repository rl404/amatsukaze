import { SHIMAKAZE_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { vtubersResponse } from '../../api/vtubers/+server';

export type eventResponse = {
	month: string;
	birthday: vtubersResponse;
	anniversary: vtubersResponse;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const month = (new Date().getMonth() + 1).toString();
	const [birthdayResp, anniversaryResp] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_birthday_month=${month}&end_birthday_month=${month}&exclude_retired=true&limit=-1`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_debut_month=${month}&end_debut_month=${month}&exclude_retired=true&limit=-1`)
	]);
	if (!birthdayResp || !anniversaryResp) return;
	return {
		month: month,
		birthday: await birthdayResp.json(),
		anniversary: await anniversaryResp.json()
	};
}) satisfies PageServerLoad;
