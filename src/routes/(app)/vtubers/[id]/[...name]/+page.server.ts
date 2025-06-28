import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { VtubersResponse } from '../../../../api/vtubers/+server';
import type { VtuberResponse } from '../../../../api/vtubers/[id]/+server';
import type { VtuberHistoriesResponse } from '../../../../api/vtubers/[id]/channel-history/+server';
import type { PageServerLoad } from './$types';

export type VtuberDetailResponse = {
	vtuber: VtuberResponse;
	histories: VtuberHistoriesResponse;
	agencies: VtubersResponse[];
	families: VtubersResponse[];
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async ({ params }) => {
	const vtuberResp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}`);
	const vtuber = (await handleAPIResponse(vtuberResp)) as VtuberResponse;

	const historiesResp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}/channel-history`);
	const histories = (await handleAPIResponse(historiesResp)) as VtuberHistoriesResponse;

	const agencies = !vtuber.data.agencies
		? []
		: await Promise.all(
				vtuber.data.agencies.map(async (agency) => {
					const resp = await fetch(
						`${SHIMAKAZE_HOST}/vtubers?mode=simple&agency=${agency.name}&limit=-1`
					);
					return await handleAPIResponse(resp);
				})
			);

	const families = !vtuber.data.character_designers
		? []
		: await Promise.all(
				vtuber.data.character_designers.map(async (designer) => {
					const resp = await fetch(
						`${SHIMAKAZE_HOST}/vtubers?mode=simple&character_designer=${designer}&limit=-1`
					);
					return await handleAPIResponse(resp);
				})
			);

	return {
		vtuber: vtuber,
		histories: histories,
		agencies: agencies,
		families: families
	};
}) satisfies PageServerLoad<VtuberDetailResponse>;
