import type { PageServerLoad } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

export type vtuberImagesResponse = {
	status: number;
	message: string;
	data: Array<vtuberImagesResponseData>;
};

export type vtuberImagesResponseData = {
	id: number;
	name: string;
	image: string;
};

export const load = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/images?shuffle=true&limit=60`);
	return await resp.json();
}) satisfies PageServerLoad;
