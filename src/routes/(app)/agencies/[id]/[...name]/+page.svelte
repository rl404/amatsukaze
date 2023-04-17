<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import Image from '$lib/components/Image.svelte';
	import AccordionStatistics from './AccordionStatistics.svelte';
	import AccordionMembers from './AccordionMembers.svelte';
	import type { agencyResponse } from './+page.server';
	import { compactInt } from '$lib/utils';

	export let data: agencyResponse;

	const agency = data.agency.data;
	const vtubers = data.vtubers.data;
</script>

<Head
	title={agency.name}
	description={`Agency with ${vtubers.length.toLocaleString()} members`}
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

	<div class="col-span-4 sm:col-span-1 flex flex-col gap-4">
		<div>
			<Image
				src={agency.image && `/api/wikia/image/${agency.image.split('?')[0]}?height=206`}
				alt={agency.name}
				class="p-2 m-auto w-full rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
			/>
		</div>
		<div class="font-bold flex justify-between gap-4">
			<div>Member Count</div>
			<div>{agency.member.toLocaleString()}</div>
		</div>
		<div class="font-bold flex justify-between gap-4">
			<div>Total Subscriber</div>
			<div title={agency.subscriber.toLocaleString()}>{compactInt(agency.subscriber)}</div>
		</div>
	</div>

	<div class="col-span-4 sm:col-span-3 flex flex-col gap-4">
		<div><AccordionStatistics data={vtubers} /></div>
		<div><AccordionMembers data={vtubers} /></div>
	</div>
</div>
