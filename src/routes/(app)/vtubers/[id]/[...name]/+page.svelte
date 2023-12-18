<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Model2DBadge from '$lib/components/badges/Model2DBadge.svelte';
	import Model3DBadge from '$lib/components/badges/Model3DBadge.svelte';
	import RetiredBadge from '$lib/components/badges/RetiredBadge.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import { generateVtuberDescription, getWikiImg } from '$lib/utils/utils';
	import type { VtuberResponse } from '../../../../api/vtubers/[id]/+server';
	import AccordionAgencyMates from './AccordionAgencyMates.svelte';
	import AccordionDetails from './AccordionDetails.svelte';
	import AccordionFamilies from './AccordionFamilies.svelte';
	import AccordionVideos from './AccordionVideos.svelte';

	export let data: VtuberResponse;

	$: vtuber = data.data;
</script>

<Head
	title={vtuber.name}
	description={generateVtuberDescription(vtuber)}
	image={getWikiImg(vtuber.image)}
/>

<div class="grid grid-cols-4 gap-4" itemscope itemtype="https://schema.org/Person">
	<h1 class="col-span-4">
		<a
			class="clickable text-3xl font-bold"
			href="{PUBLIC_VTUBER_WIKI_HOST}/{vtuber.name}"
			target="_blank"
			rel="noreferrer"
			title={new Date(vtuber.updated_at).toISOString()}
		>
			<span itemprop="name">{vtuber.name}</span>
			<span title="Emoji" itemprop="identifier">{vtuber.emoji}</span>
		</a>
		<Border />
	</h1>

	<div class="col-span-4 flex flex-col gap-4 sm:col-span-1">
		<Image
			src={getWikiImg(vtuber.image)}
			alt={vtuber.name}
			class="w-full rounded-lg border border-border bg-card dark:border-border-dark dark:bg-card-dark"
		/>
		{#if vtuber.caption}
			<div
				class="subtitle pointer-events-none text-center font-bold italic"
				title="quote"
				itemprop="description"
			>
				{vtuber.caption}
			</div>
		{/if}
		<div class="flex flex-wrap items-center justify-center gap-2">
			{#if vtuber.has_2d}
				<Model2DBadge />
			{/if}
			{#if vtuber.has_3d}
				<Model3DBadge />
			{/if}
			{#if vtuber.retirement_date}
				<RetiredBadge />
			{/if}
		</div>
	</div>

	<div class="col-span-4 flex flex-col gap-4 sm:col-span-3">
		<AccordionDetails data={vtuber} />
		<AccordionAgencyMates id={vtuber.id} agencies={vtuber.agencies.map((a) => a.name)} />
		<AccordionFamilies id={vtuber.id} designers={vtuber.character_designers || []} />
		<AccordionVideos data={vtuber.channels} />
	</div>
</div>
