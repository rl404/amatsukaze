import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { vtubersResponse } from '../../api/vtubers/+server';
import type { agenciesResponse } from '../../api/agencies/+server';
import type { PageServerLoad } from './$types';

export type statsResponse = {
	vtubers: vtubersResponse;
	agencies: agenciesResponse;
};

export const load = (async () => {
	const [vtubersResp, agenciesResp] = await Promise.all([
		fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers?mode=stats&limit=-1`),
		fetch(`${PUBLIC_SHIMAKAZE_HOST}/agencies`)
	]);
	if (!vtubersResp.ok || !agenciesResp.ok) return;
	return {
		vtubers: await vtubersResp.json(),
		agencies: await agenciesResp.json()
	};
}) satisfies PageServerLoad;
