import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { AgenciesResponse } from '../../api/agencies/+server';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const resp = await fetch(`${SHIMAKAZE_HOST}/agencies?limit=-1`);
	return await handleAPIResponse(resp);
}) satisfies PageServerLoad<AgenciesResponse>;
