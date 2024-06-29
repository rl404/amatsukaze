import { handleAPIResponse } from '$lib/utils/api';
import { SHIMAKAZE_HOST } from '$env/static/private';
import type { AgenciesResponse } from '../api/agencies/+server';
import type { VtuberResponseData } from '../api/vtubers/[id]/+server';
import type { AgencyResponseData } from '../api/agencies/[id]/+server';
import type { VtubersResponse } from '../api/vtubers/+server';
import type { RequestHandler } from './$types';

const site = 'https://amatsukaze.rl404.com';

const sitemap = (
	vtubers: VtuberResponseData[],
	agencies: AgencyResponseData[]
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${site}/vtubers</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${site}/agencies</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${site}/events</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${site}/statistics</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${vtubers
		.map(
			(v) => `
  <url>
    <loc>${site}/vtubers/${v.id}</loc>
    <lastmod>${v.updated_at.slice(0, 10)}</lastmod>
    <changefreq>${!v.retirement_date ? 'daily' : 'weekly'}</changefreq>
    <priority>${!v.retirement_date ? '0.8' : '0.6'}</priority>
  </url>
  `
		)
		.join('')}
    ${agencies
			.map(
				(a) => `
  <url>
    <loc>${site}/agencies/${a.id}</loc>
    <lastmod>${a.updated_at.slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
    `
			)
			.join('')}
</urlset>
`;

export const GET = (async () => {
	const [vtubersResp, agenciesResp] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/vtubers?mode=simple&limit=-1`),
		await fetch(`${SHIMAKAZE_HOST}/agencies?limit=-1`)
	]);

	const vtubers: VtubersResponse = await handleAPIResponse(vtubersResp);
	const agencies: AgenciesResponse = await handleAPIResponse(agenciesResp);

	return new Response(sitemap(vtubers.data, agencies.data), {
		headers: {
			'content-type': 'application/xml',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		}
	});
}) satisfies RequestHandler;
