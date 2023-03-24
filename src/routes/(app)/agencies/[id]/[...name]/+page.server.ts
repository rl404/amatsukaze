import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { vtubersResponse } from '../../../../api/vtubers/+server';
import type { agencyResponse as _agencyResponse } from '../../../../api/agencies/[id]/+server';
import type { PageServerLoad } from './$types';

export type agencyResponse = {
	agency: _agencyResponse;
	vtubers: vtubersResponse;
};

export const load = (async ({ params }) => {
	const [agencyResp, vtubersResp] = await Promise.all([
		fetch(`${PUBLIC_SHIMAKAZE_HOST}/agencies/${params.id}`),
		fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers?agency_id=${params.id}&limit=-1`)
	]);
	if (!agencyResp || !vtubersResp) return;
	return {
		agency: await agencyResp.json(),
		vtubers: await vtubersResp.json()
	};
}) satisfies PageServerLoad;
