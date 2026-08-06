import type { RequestHandler } from './$types';

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 365
	}
};

export const GET = (async ({ params }) => {
	const width = parseInt(params.width || '');
	const height = parseInt(params.height || '');

	if (width > 0) params.path += `/scale-to-width-down/${width}`;
	if (height > 0) params.path += `/scale-to-height-down/${height}`;

	const resp = await fetch(params.path);
	const blob = await resp.blob();

	return new Response(blob, {
		headers: {
			'content-type': 'image/webp',
			'cache-control': 'max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000'
		},
		status: resp.status
	});
}) satisfies RequestHandler;
