<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { vtuberSorter } from '$lib/utils/utils';
	import axios from 'axios';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let id: number;
	export let designer: string;
	export let open: boolean = false;

	let vtubers: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let sort: VtuberSort = 'name';
	let layout: VtuberLayout = 'grid';

	$: designer,
		axios
			.get(`/api/vtubers?mode=simple&character_designer=${designer}&limit=-1`)
			.then((resp) => (vtubers = resp.data.data.filter((d: VtuberResponseData) => d.id !== id)))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));

	const toggleOpen = () => (open = !open);
</script>

<section class="grid grid-cols-6 gap-2">
	<div class="col-span-6 flex items-center gap-2">
		<Border>
			<h3 class="pointer-events-none whitespace-nowrap px-4 font-bold">
				{designer} ({vtubers.length.toLocaleString()})
			</h3>
		</Border>
		{#if open}
			<VtuberSortButton class="h-4 w-4" bind:value={sort} />
			<VtuberLayoutButton class="h-4 w-4" bind:value={layout} />
		{/if}
		<IconButton on:click={toggleOpen} title={open ? 'hide' : 'show'} class="p-1.5">
			{#if open}
				<ChevronUpIcon class="h-4 w-4" />
			{:else}
				<ChevronDownIcon class="h-4 w-4" />
			{/if}
		</IconButton>
	</div>

	{#if open}
		{#if loading}
			<div class="col-span-6">
				<Loading class="h-6 w-6" />
			</div>
		{:else if error !== ''}
			<div class="col-span-6 text-center text-red-500">
				{error}
			</div>
		{:else if vtubers.length === 0}
			<div class="col-span-6 text-center">no vtubers found...</div>
		{:else}
			{#each vtubers.sort(vtuberSorter(sort)) as vtuber}
				{#if layout === 'grid'}
					<VtuberGrid
						id={vtuber.id}
						name={vtuber.name}
						image={vtuber.image}
						class="col-span-2 text-sm sm:col-span-2 md:col-span-1"
						itemprop="sibling"
					/>
				{:else if layout === 'card'}
					<VtuberCard
						id={vtuber.id}
						name={vtuber.name}
						image={vtuber.image}
						has2d={vtuber.has_2d}
						has3d={vtuber.has_3d}
						agencies={vtuber.agencies.map((a) => a.name)}
						debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
						retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
						class="col-span-6 sm:col-span-3 sm:text-xs lg:col-span-2"
						itemprop="sibling"
					/>
				{:else if layout === 'list'}
					<VtuberList
						id={vtuber.id}
						name={vtuber.name}
						image={vtuber.image}
						has2d={vtuber.has_2d}
						has3d={vtuber.has_3d}
						agencies={vtuber.agencies.map((a) => a.name)}
						debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
						retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
						class="col-span-6"
						itemprop="sibling"
					/>
				{/if}
			{/each}
		{/if}
	{/if}
</section>
