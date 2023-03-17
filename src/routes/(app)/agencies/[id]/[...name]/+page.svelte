<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import Image from '$lib/components/Image.svelte';
	import type { agencyResponse } from '../../../../api/agencies/[id]/+server';
	import AccordionStatistics from './AccordionStatistics.svelte';
	import AccordionMembers from './AccordionMembers.svelte';

	export let data: agencyResponse;

	const agency = data.data;
</script>

<Head
	title={agency.name}
	description="Visualize agency data from wikia to a page."
	image={agency.image && `/api/wikia/image/${agency.image.split('?')[0]}?height=206`}
/>

<div class="grid grid-cols-4 gap-4">
	<div class="col-span-4">
		<a
			class="text-3xl font-bold"
			href="{PUBLIC_VTUBER_WIKI_HOST}/{agency.name}"
			target="_blank"
			rel="noreferrer"
			title={new Date(agency.updated_at).toString()}
		>
			{agency.name}
		</a>
		<Border />
	</div>

	<div class="col-span-4 sm:col-span-1">
		<Image
			src={agency.image && `/api/wikia/image/${agency.image.split('?')[0]}?height=206`}
			alt={agency.name}
			class="p-2 m-auto w-full rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
		/>
	</div>

	<div class="col-span-4 sm:col-span-3 flex flex-col gap-4">
		<div><AccordionStatistics agency={agency.name} /></div>
		<div><AccordionMembers agency={agency.name} /></div>
	</div>
</div>