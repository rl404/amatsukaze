import { SHIMAKAZE_HOST } from '$env/static/private';
import type { ChannelType } from '$lib/types';
import type { BaseAPIResponse } from '../../../types';
import type { RequestHandler } from './$types';

export type VtuberHistoriesResponse = BaseAPIResponse & {
	data: VtuberHistoriesResponseData[];
};

export type VtuberHistoriesResponseData = {
	year: number;
	month: number;
	day: number;
	channel_id: string;
	channel_type: ChannelType;
	subscriber: number;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}/channel-history`);
	const body = await resp.json();
	return new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
