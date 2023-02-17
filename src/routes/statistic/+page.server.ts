import type { PageServerLoad } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export type vtubersResponse = {
	status: number;
	message: string;
	data: Array<vtubersResponseData>;
};

export type vtubersResponseData = {
	id: number;
	name: string;
	debut_date?: Date;
	retirement_date?: Date;
	has_2d: boolean;
	has_3d: boolean;
	character_designers?: Array<string>;
	character_2d_modelers?: Array<string>;
	character_3d_modelers?: Array<string>;
	agencies?: Array<{
		id: number;
		name: string;
		image: string;
	}>;
	channels?: Array<{
		type: string;
		url: string;
	}>;
	gender: string;
	age?: number;
	birthday?: Date;
	height?: number;
	weight?: number;
	blood_type: string;
	zodiac_sign: string;
};

export const load = (async () => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers?mode=stats&page=1&limit=-1`);
	return await resp.json();
}) satisfies PageServerLoad;
