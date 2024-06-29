import type { RequestHandler } from './$types';

export const GET = (async ({ url, params }) => {
	const width = url.searchParams.get('width');
	const height = url.searchParams.get('height');

	if (width) params.path += `/scale-to-width-down/${width}`;
	if (height) params.path += `/scale-to-height-down/${height}`;

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
