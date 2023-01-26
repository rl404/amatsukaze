import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const resp = await fetch(`${params.path}`);
	const blob = await resp.blob();
	return new Response(blob, {
		headers: { 'content-type': 'image/png' },
		status: resp.status
	});
}) satisfies RequestHandler;
