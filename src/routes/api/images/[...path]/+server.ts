import type { RequestHandler } from './$types';

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const GET = (async ({ params }) => {
	const resp = await fetch(params.path);
	const blob = await resp.blob();
	return new Response(blob, {
		headers: {
			'content-type': 'image/webp',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
