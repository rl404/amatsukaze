import { PUBLIC_SHIMAKAZE_HOST } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const resp = await fetch(`${PUBLIC_SHIMAKAZE_HOST}/agencies/${params.id}`);
	return await resp.json();
}) satisfies PageServerLoad;
