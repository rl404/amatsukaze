import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse, MetaAPIResponse } from '../types';
import type { RequestHandler } from './$types';

export type VideosResponse = BaseAPIResponse & {
	data: VideoResponseData[];
	meta: MetaAPIResponse;
};

export type VideoResponseData = {
	vtuber_id: number;
	vtuber_name: string;
	vtuber_image: string;
	channel_id: string;
	channel_name: string;
	channel_type: string;
	channel_url: string;
	video_id: string;
	video_title: string;
	video_url: string;
	video_image: string;
	video_start_date?: string;
	video_end_date?: string;
};

export const GET = (async ({ url }) => {
	const queries = ['start_date', 'end_date', 'is_finished', 'sort', 'page', 'limit']
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');

	const resp = await fetch(`${SHIMAKAZE_HOST}/videos?${queries}`);
	const body = await resp.json();
	return new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=3600, s-maxage=1800, stale-while-revalidate=3600'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
