import type { RequestHandler } from './$types';
import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';

export type vtuberResponse = {
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
	channels: Array<{ type: string; url: string }>;
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
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/vtubers/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
