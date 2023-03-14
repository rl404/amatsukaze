<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import Image from '$lib/components/Image.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import { getAxiosError, vtuberSorter } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { agencyResponse } from '../../../api/agencies/[id]/+server';
	import type { vtuberResponseData } from '../../../api/vtubers/[id]/+server';
	import Sort from './Sort.svelte';
	import Layout from './Layout.svelte';

	export let data: agencyResponse;

	const agency = data.data;

	let vtubers: Array<vtuberResponseData> = [];
	let layout: string = 'grid';
	let sort: string = 'name';
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/vtubers?agency=${agency.name}&limit=-1`)
			.then((resp) => {
				vtubers = resp.data.data;
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	});

	$: sort, onSort();

	const onSort = () => {
		vtubers = vtubers.sort(vtuberSorter(sort));
	};
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

	<div class="col-span-4 sm:col-span-3 grid grid-cols-6 gap-4">
		<div class="col-span-6 flex gap-2">
			<Border>
				<span class="px-4 whitespace-nowrap font-bold">Members ({vtubers.length.toLocaleString()})</span>
			</Border>
			<Sort bind:value={sort} />
			<Layout bind:value={layout} />
		</div>
		{#if loading}
			<div class="col-span-6">
				<SpinnerIcon class="w-6 h-6 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
			</div>
		{:else if error !== ''}
			<div class="col-span-6 text-red-500 text-center">
				{error}
			</div>
		{:else}
			{#each vtubers as vtuber}
				{#if layout === 'grid'}
					<VtuberGrid class="col-span-2 sm:col-span-2 md:col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} smallText />
				{:else if layout === 'card'}
					<VtuberCard
						class="col-span-6 sm:col-span-3 lg:col-span-2"
						id={vtuber.id}
						name={vtuber.name}
						image={vtuber.image}
						has2d={vtuber.has_2d}
						has3d={vtuber.has_3d}
						agencies={vtuber.agencies.map((a) => a.name)}
						debutDate={vtuber.debut_date}
						retirementDate={vtuber.retirement_date}
						height={206}
						smallText
					/>
				{:else if layout === 'list'}
					<VtuberList
						class="col-span-6"
						id={vtuber.id}
						name={vtuber.name}
						image={vtuber.image}
						has2d={vtuber.has_2d}
						has3d={vtuber.has_3d}
						agencies={vtuber.agencies.map((a) => a.name)}
						debutDate={vtuber.debut_date}
						retirementDate={vtuber.retirement_date}
						height={206}
						smallText
					/>
				{/if}
			{/each}
		{/if}
	</div>
</div>
