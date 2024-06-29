<script lang="ts">
	import { generateAgencyDescription } from '$lib/utils/utils';
	import type { Organization, WithContext } from 'schema-dts';
	import type { AgencyResponseData } from '../../../../api/agencies/[id]/+server';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let agency: AgencyResponseData;
	export let vtubers: VtuberResponseData[];

	let schema: WithContext<Organization>;

	$: schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		url: `https://amatsukaze.rl404.com/agencies/${agency.id}/${agency.name}`,
		identifier: agency.id.toString(),
		name: agency.name,
		description: generateAgencyDescription(agency),
		logo: agency.image,
		image: agency.image,
		member: vtubers.map((v) => ({
			'@type': 'Person',
			identifier: v.id.toString(),
			name: v.name,
			url: `https://amatsukaze.rl404.com/vtubers/${v.id}/${v.name}`
		}))
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
