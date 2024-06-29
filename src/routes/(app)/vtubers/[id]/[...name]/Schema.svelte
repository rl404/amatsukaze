<script lang="ts">
	import { generateVtuberDescription } from '$lib/utils/utils';
	import type { ProfilePage, WithContext } from 'schema-dts';
	import type { VtubersResponse } from '../../../../api/vtubers/+server';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let vtuber: VtuberResponseData;
	export let agencies: VtubersResponse[];
	export let families: VtubersResponse[];

	let schema: WithContext<ProfilePage>;

	$: schema = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@id': `https://amatsukaze.rl404.com/vtubers/${vtuber.id}/${vtuber.name}`,
			'@type': 'Person',
			url: `https://amatsukaze.rl404.com/vtubers/${vtuber.id}/${vtuber.name}`,
			identifier: vtuber.id,
			name: vtuber.name,
			alternateName: [...vtuber.original_names, ...vtuber.nicknames],
			description: generateVtuberDescription(vtuber),
			image: vtuber.image,
			birthDate: vtuber.debut_date,
			deathDate: vtuber.retirement_date,
			gender: vtuber.gender,
			height: vtuber.height,
			weight: vtuber.weight,
			parent: vtuber.character_designers,
			publishingPrinciples: vtuber.channels.map((c) => c.url),
			affiliation: vtuber.agencies.map((a) => ({
				'@type': 'Organization',
				identifier: a.id,
				name: a.name,
				url: `https://amatsukaze.rl404.com/agencies/${a.id}/${a.name}`
			})),
			colleague: agencies.reduce(
				(res, curr) => [
					...res,
					...curr.data.map((d) => ({
						'@type': 'Person',
						identifier: d.id,
						name: d.name,
						url: `https://amatsukaze.rl404.com/vtubers/${d.id}/${d.name}`
					}))
				],
				[] as any
			),
			sibling: families.reduce(
				(res, curr) => [
					...res,
					...curr.data
						.filter((f) => f.id !== vtuber.id)
						.map((f) => ({
							'@type': 'Person',
							identifier: f.id,
							name: f.name,
							url: `https://amatsukaze.rl404.com/vtubers/${f.id}/${f.name}`
						}))
				],
				[] as any
			)
		},
		dateModified: vtuber.updated_at
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
