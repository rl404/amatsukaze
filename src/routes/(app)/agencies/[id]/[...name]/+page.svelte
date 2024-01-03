<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import { compactInt, getWikiImg } from '$lib/utils/utils';
	import type { AgencyPageResponse } from './+page.server';
	import AccordionMembers from './AccordionMembers.svelte';
	import AccordionStatistics from './AccordionStatistics.svelte';

	export let data: AgencyPageResponse;

	$: agency = data.agency.data;
	$: vtubers = data.vtubers.data;
</script>

<Head
	title={agency.name}
	description={`Explore ${
		agency.name
	} agency housing ${agency.member.toLocaleString()} incredible talents cherished by ${compactInt(
		agency.subscriber
	)} fans. Discover their monthly member count insights and debut-to-retirement timelines for each member, unraveling the agency's journey in the virtual universe.`}
	image={getWikiImg(agency.image)}
/>

<div class="grid grid-cols-4 gap-4" itemscope itemtype="https://schema.org/Organization">
	<h1 class="col-span-4">
		<a
			class="clickable text-3xl font-bold"
			href="{PUBLIC_VTUBER_WIKI_HOST}/{agency.name}"
			target="_blank"
			rel="noreferrer"
			title={new Date(agency.updated_at).toString()}
			itemprop="name"
		>
			{agency.name}
		</a>
	</h1>

	<Border class="col-span-4" />

	<div class="col-span-4 flex flex-col gap-4 sm:col-span-1">
		<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
			<Image
				src={getWikiImg(agency.image)}
				alt={agency.name}
				class="m-auto w-full rounded-lg border border-border bg-card p-2 dark:border-border-dark dark:bg-card-dark"
			/>
		</div>
		<div class="flex justify-between gap-4 font-bold">
			<span>Member Count</span>
			<span>{agency.member.toLocaleString()}</span>
		</div>
		<div class="flex justify-between gap-4 font-bold">
			<span>Total Subscriber</span>
			<span title={agency.subscriber.toLocaleString()}>{compactInt(agency.subscriber)}</span>
		</div>
	</div>

	<div class="col-span-4 flex flex-col gap-4 sm:col-span-3">
		<AccordionStatistics data={vtubers} />
		<AccordionMembers data={vtubers} />
	</div>
</div>
