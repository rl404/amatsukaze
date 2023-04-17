import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const resp = await fetch(params.path);
	const blob = await resp.blob();
	return new Response(blob, {
		headers: {
			'content-type': 'image/webp',
			'cache-control': 'max-age=604800, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
