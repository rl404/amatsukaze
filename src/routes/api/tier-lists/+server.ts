import { SHIMAKAZE_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export type tierListsResponse = {
	status: number;
	message: string;
	data: tierListsResponseData[];
};

export type tierListResponse = {
	status: number;
	message: string;
	data: tierListsResponseData;
};

export type tierListsResponseData = {
	id: string;
	title: string;
	description: string;
	tiers: tierResponseDataTier[];
	options: tierResponseDataVtuber[];
	user: tierResponseDataUser;
	updated_at: string;
};

type tierResponseDataTier = {
	label: string;
	description: string;
	color: string;
	size: string;
	vtubers: tierResponseDataVtuber[];
};

type tierResponseDataVtuber = {
	id: number;
	name: string;
	image: string;
	description: string;
};

type tierResponseDataUser = {
	id: number;
	username: string;
};

export const GET = (async ({ url }) => {
	const queries = ['query', 'user_id', 'sort', 'page', 'limit'].map((q) => `${q}=${url.searchParams.get(q) ?? ''}`).join('&');
	const resp = await fetch(`${SHIMAKAZE_HOST}/tier-lists?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

export const PUT = (async ({ request }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/tier-lists`, {
		method: 'put',
		headers: { Authorization: request.headers.get('authorization') || '' },
		body: JSON.stringify(await request.json())
	});
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
