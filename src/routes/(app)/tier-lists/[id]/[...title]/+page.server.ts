import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '$lib/types';
import { handleAPIResponse } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export type TierListResponse = BaseAPIResponse & {
	data: TierListResponseData;
};

export type TierListResponseData = {
	id: string;
	title: string;
	description: string;
	tiers: TierListResponseDataTier[];
	options: TierListResponseDataVtuber[];
	user: TierListResponseDataUser;
	updated_at: string;
};

export type TierListResponseDataTier = {
	label: string;
	description: string;
	color: string;
	size: string;
	vtubers: TierListResponseDataVtuber[];
};

export type TierListResponseDataVtuber = {
	id: number;
	name: string;
	image: string;
	description: string;
};

type TierListResponseDataUser = {
	id: number;
	username: string;
};

export const load = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/tier-lists/${params.id}`);
	return handleAPIResponse(resp);
}) satisfies PageServerLoad<TierListResponse>;
