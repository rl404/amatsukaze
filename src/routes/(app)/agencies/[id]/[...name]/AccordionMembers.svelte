<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import Border from '$lib/components/Border.svelte';
	import { getAxiosError, vtuberSorter } from '$lib/utils';
	import axios from 'axios';
	import type { vtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import MembersTimeline from './MembersTimeline.svelte';
	import Layout from './Layout.svelte';
	import Sort from './Sort.svelte';

	export let agency: string;

	let vtubers: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';
	let open: boolean = false;
	let sort: string = 'debut_date';
	let layout: string = 'timeline';

	$: open && fetchData();
	$: vtubers = vtubers.sort(vtuberSorter(sort));

	const fetchData = () => {
		loading = true;
		error = '';

		axios
			.get(`/api/vtubers?agency=${agency}&limit=-1`)
			.then((resp) => {
				vtubers = resp.data.data;
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<Accordion title="Members" bind:open>
	<div class="grid grid-cols-6 gap-2">
		{#if loading}
			<div class="col-span-6">
				<SpinnerIcon class="w-6 h-6 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
			</div>
		{:else if error !== ''}
			<div class="col-span-6 text-center text-red-500">
				{error}
			</div>
		{:else if vtubers.length === 0}
			<div class="col-span-6 text-center">no vtubers found...</div>
		{:else}
			<div class="col-span-6 flex items-center gap-2">
				<Border>
					<span class="px-4 font-bold whitespace-nowrap">{vtubers.length.toLocaleString()} members</span>
				</Border>
				<Sort bind:value={sort} {layout} />
				<Layout bind:value={layout} bind:sort />
			</div>
			{#if layout === 'timeline'}
				<div class="col-span-6">
					<MembersTimeline data={vtubers} bind:sort />
				</div>
			{:else}
				{#each vtubers as vtuber}
					{#if layout === 'grid'}
						<VtuberGrid
							class="col-span-2 sm:col-span-2 md:col-span-1"
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							height={206}
							smallText
						/>
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
		{/if}
	</div>
</Accordion>
