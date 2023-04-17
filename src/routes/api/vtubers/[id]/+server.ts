import type { RequestHandler } from './$types';
import { SHIMAKAZE_HOST } from '$env/static/private';

export type vtuberResponse = {
	status: number;
	message: string;
	data: vtuberResponseData;
};

export type vtuberResponseData = {
	id: number;
	name: string;
	image: string;
	original_names: Array<string>;
	nicknames: Array<string>;
	caption: string;
	debut_date?: Date;
	retirement_date?: Date;
	has_2d: boolean;
	has_3d: boolean;
	character_designers: Array<string>;
	character_2d_modelers: Array<string>;
	character_3d_modelers: Array<string>;
	agencies: Array<{
		id: number;
		name: string;
		image: string;
	}>;
	affiliations: Array<string>;
	channels: Array<vtuberResponseDataChannel>;
	social_medias: Array<string>;
	official_websites: Array<string>;
	gender: string;
	age?: number;
	birthday?: Date;
	height?: number;
	weight?: number;
	blood_type: string;
	zodiac_sign: string;
	emoji: string;
	updated_at: Date;
};

export type vtuberResponseDataChannel = {
	id: string;
	name: string;
	type: string;
	url: string;
	image: string;
	subscriber: number;
	videos: Array<vtuberResponseDataChannelVideo>;
};

export type vtuberResponseDataChannelVideo = {
	id: string;
	title: string;
	url: string;
	image: string;
	start_date?: Date;
	end_date?: Date;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
