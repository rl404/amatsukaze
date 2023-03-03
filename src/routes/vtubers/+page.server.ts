import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { vtuberResponseData } from '../api/vtubers/[id]/+server';
import type { PageServerLoad } from './$types';

export type vtubersResponse = {
	status: number;
	message: string;
	data: Array<vtuberResponseData>;
	meta: { page: number; limit: number; total: number };
};

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers?page=1&limit=24`);
	return await resp.json();
}) satisfies PageServerLoad;
