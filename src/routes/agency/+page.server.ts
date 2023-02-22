import type { PageServerLoad } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export type agencyResponse = {
	status: number;
	message: string;
	data: agencyResponseData;
};

export type agencyResponseData = {
	nodes: Array<{
		id: number;
		name: string;
		image: string;
		has_retired: boolean;
		agencies: Array<string>;
	}>;
	links: Array<{
		id1: number;
		id2: number;
	}>;
};

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers/agency-trees`);
	return await resp.json();
}) satisfies PageServerLoad;
