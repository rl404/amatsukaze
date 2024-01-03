import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { VtuberResponse } from '../../../../api/vtubers/[id]/+server';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async ({ params }) => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/vtubers/${params.id}`);
	return handleAPIResponse(resp);
}) satisfies PageServerLoad<VtuberResponse>;
