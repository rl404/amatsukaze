import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { AgencyResponse } from '../../../../api/agencies/[id]/+server';
import type { VtubersResponse } from '../../../../api/vtubers/+server';
import type { PageServerLoad } from './$types';

export type AgencyPageResponse = {
	agency: AgencyResponse;
	vtubers: VtubersResponse;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async ({ params }) => {
	const [agencyResp, vtubersResp] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/agencies/${params.id}`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?agency_id=${params.id}&limit=-1`)
	]);
	return {
		agency: handleAPIResponse(agencyResp),
		vtubers: handleAPIResponse(vtubersResp)
	};
}) satisfies PageServerLoad;
