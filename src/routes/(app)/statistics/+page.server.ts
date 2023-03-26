import type { vtubersResponse } from '../../api/vtubers/+server';
import type { agenciesResponse } from '../../api/agencies/+server';
import type { PageServerLoad } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

export type statsResponse = {
	vtubers: vtubersResponse;
	agencies: agenciesResponse;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const [vtubersResp, agenciesResp] = await Promise.all([
		fetch(`${SHIMAKAZE_HOST}/vtubers?mode=stats&limit=-1`),
		fetch(`${SHIMAKAZE_HOST}/agencies`)
	]);
	if (!vtubersResp.ok || !agenciesResp.ok) return;
	return {
		vtubers: await vtubersResp.json(),
		agencies: await agenciesResp.json()
	};
}) satisfies PageServerLoad;
