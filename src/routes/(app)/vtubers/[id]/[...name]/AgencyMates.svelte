<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import { getAxiosError, vtuberSorter } from '$lib/utils';
	import axios from 'axios';
	import type { vtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import Layout from './Layout.svelte';
	import Sort from './Sort.svelte';

	export let id: number;
	export let agency: string;
	export let open: boolean = false;

	let vtubers: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';
	let layout: string = 'grid';
	let sort: string = 'name';

	axios
		.get(`/api/vtubers?agency=${agency}&limit=-1`)
		.then((resp) => {
			vtubers = resp.data.data.filter((d: vtuberResponseData) => d.id !== id);
		})
		.catch((err) => {
			error = getAxiosError(err);
		})
		.finally(() => {
			loading = false;
		});

	const toggleOpen = () => {
		open = !open;
	};

	$: sort, onSort();

	const onSort = () => {
		vtubers = vtubers.sort(vtuberSorter(sort));
	};
</script>

<div class="grid grid-cols-6 gap-2">
	<div class="col-span-6 flex gap-2">
		<Border>
			<span class="px-4 font-bold whitespace-nowrap">{agency} ({vtubers.length.toLocaleString()})</span>
		</Border>
		{#if open}
			<Sort bind:value={sort} />
			<Layout bind:value={layout} />
		{/if}
		<div>
			<IconButton on:click={toggleOpen} title={open ? 'hide' : 'show'}>
				{#if open}
					<ChevronUpIcon class="w-4 h-4" />
				{:else}
					<ChevronDownIcon class="w-4 h-4" />
				{/if}
			</IconButton>
		</div>
	</div>
	{#if open}
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
	{/if}
</div>
