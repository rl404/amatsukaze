<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Model2DBadge from '$lib/components/badges/Model2DBadge.svelte';
	import Model3DBadge from '$lib/components/badges/Model3DBadge.svelte';
	import RetiredBadge from '$lib/components/badges/RetiredBadge.svelte';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import Image from '$lib/components/Image.svelte';
	import type { vtuberResponse } from '../../../../api/vtubers/[id]/+server';
	import AccordionAgencyMates from './AccordionAgencyMates.svelte';
	import AccordionDetails from './AccordionDetails.svelte';
	import AccordionFamilies from './AccordionFamilies.svelte';

	export let data: vtuberResponse;

	const vtuber = data.data;

	const debutDate = !vtuber.debut_date ? '-' : vtuber.debut_date.toString().slice(0, 10);
	const retiredDate = !vtuber.retirement_date ? '-' : vtuber.retirement_date.toString().slice(0, 10);
	const headDescription = `Agency: ${vtuber.agencies.map((a) => a.name).join(', ')}. Debut: ${debutDate}. Retired: ${retiredDate}.`;
</script>

<Head title={vtuber.name} description={headDescription} image={vtuber.image && `/api/wikia/image/${vtuber.image.split('?')[0]}?height=206`} />

<div class="grid grid-cols-4 gap-4">
	<div class="col-span-4">
		<a
			class="text-3xl font-bold"
			href="{PUBLIC_VTUBER_WIKI_HOST}/{vtuber.name}"
			target="_blank"
			rel="noreferrer"
			title={new Date(vtuber.updated_at).toString()}
		>
			{vtuber.name} <span title="Emoji">{vtuber.emoji}</span>
		</a>
		<Border />
	</div>

	<div class="col-span-4 sm:col-span-1 flex flex-col gap-4">
		<div>
			<Image
				src={vtuber.image && `/api/wikia/image/${vtuber.image.split('?')[0]}?height=206`}
				alt={vtuber.name}
				class="m-auto w-full rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
			/>
		</div>
		{#if vtuber.caption !== ''}
			<div class="italic text-center opacity-70 font-bold" title="quote">{vtuber.caption}</div>
		{/if}
		<div class="flex flex-wrap gap-2 justify-center">
			{#if vtuber.has_2d}
				<div><Model2DBadge /></div>
			{/if}
			{#if vtuber.has_3d}
				<div><Model3DBadge /></div>
			{/if}
			{#if vtuber.retirement_date}
				<div><RetiredBadge /></div>
			{/if}
		</div>
	</div>

	<div class="col-span-4 sm:col-span-3 flex flex-col gap-4">
		<div><AccordionDetails data={vtuber} /></div>
		<div><AccordionAgencyMates id={vtuber.id} agencies={vtuber.agencies.map((a) => a.name)} /></div>
		<div><AccordionFamilies id={vtuber.id} designers={vtuber.character_designers || []} /></div>
	</div>
</div>
