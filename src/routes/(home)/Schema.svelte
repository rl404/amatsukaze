<script lang="ts">
	import type { WebSite, WithContext } from 'schema-dts';

	const schema: WithContext<WebSite> = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: 'https://amatsukaze.rl404.com',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: 'https://amatsukaze.rl404.com/vtubers?names={query}'
			},
			query: 'required',
			'query-input': 'required name=query'
		}
	};
</script>

<svelte:head>
	<link rel="canonical" href="https://amatsukaze.rl404.com" />
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
