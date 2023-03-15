import type { PageServerLoad } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

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
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers/images?shuffle=true&limit=60`);
	return await resp.json();
}) satisfies PageServerLoad;
