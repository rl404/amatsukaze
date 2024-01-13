import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '$lib/types';
import type { RequestHandler } from './$types';

export type VtuberResponse = BaseAPIResponse & {
	data: VtuberResponseData;
};

export type VtuberResponseData = {
	id: number;
	name: string;
	image: string;
	original_names: string[];
	nicknames: string[];
	caption: string;
	debut_date?: string;
	retirement_date?: string;
	has_2d: boolean;
	has_3d: boolean;
	character_designers: string[];
	character_2d_modelers: string[];
	character_3d_modelers: string[];
	agencies: {
		id: number;
		name: string;
		image: string;
	}[];
	affiliations: string[];
	channels: VtuberResponseDataChannel[];
	subscriber: number;
	video_count: number;
	social_medias: string[];
	official_websites: string[];
	gender: string;
	age?: number;
	birthday?: string;
	height?: number;
	weight?: number;
	blood_type: string;
	zodiac_sign: string;
	emoji: string;
	updated_at: string;
};

export type VtuberResponseDataChannel = {
	id: string;
	name: string;
	type: string;
	url: string;
	image: string;
	subscriber: number;
	videos: VtuberResponseDataChannelVideo[];
};

export type VtuberResponseDataChannelVideo = {
	id: string;
	title: string;
	url: string;
	image: string;
	start_date?: string;
	end_date?: string;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}`);
	const body = await resp.json();
	return new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
