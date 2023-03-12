import type { PageServerLoad } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export type vtuberFamilyTreeResponse = {
	status: number;
	message: string;
	data: vtuberFamilyTreeResponseData;
};

export type vtuberFamilyTreeResponseData = {
	nodes: Array<{
		id: number;
		name: string;
		image: string;
		has_retired: boolean;
	}>;
	links: Array<{
		id1: number;
		id2: number;
		role: string;
	}>;
};

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers/family-trees`);
	return await resp.json();
}) satisfies PageServerLoad;