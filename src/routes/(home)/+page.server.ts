import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '$lib/types';
import { handleAPIResponse } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export type VtuberImagesResponse = BaseAPIResponse & {
	data: VtuberImagesResponseData[];
};

export type VtuberImagesResponseData = {
	id: number;
	name: string;
	image: string;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/images?shuffle=true&limit=60`);
	return handleAPIResponse(resp);
}) satisfies PageServerLoad<VtuberImagesResponse>;
