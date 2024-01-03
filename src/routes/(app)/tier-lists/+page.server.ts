import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse, MetaAPIResponse } from '$lib/types';
import { handleAPIResponse } from '$lib/utils/api';
import type { PageServerLoad } from './$types';
import type { TierListResponseData } from './[id]/[...title]/+page.server';

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export type TierListsResponse = BaseAPIResponse & {
	data: TierListResponseData[];
	meta: MetaAPIResponse;
};

export const load = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/tier-lists`);
	return handleAPIResponse(resp);
}) satisfies PageServerLoad<TierListsResponse>;
