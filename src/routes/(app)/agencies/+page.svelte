<script lang="ts">
	import { page as appPage } from '$app/stores';
	import AgencyLayoutButton from '$lib/components/buttons/AgencyLayoutButton.svelte';
	import AgencySortButton from '$lib/components/buttons/AgencySortButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import AgencyGrid from '$lib/components/layouts/AgencyGrid.svelte';
	import AgencyList from '$lib/components/layouts/AgencyList.svelte';
	import type { AgencyLayout, AgencySort } from '$lib/types';
	import { agencySorter } from '$lib/utils/utils';
	import { onMount } from 'svelte';
	import type { AgenciesResponse } from '../../api/agencies/+server';
	import type { AgencyResponseData } from '../../api/agencies/[id]/+server';
	import InputSearch from './InputSearch.svelte';

	export let data: AgenciesResponse;

	let name: string = '';
	let sort: AgencySort = 'name';
	let layout: AgencyLayout = 'grid';
	let agencies: AgencyResponseData[] = data.data;

	onMount(() => {
		const nameParam = $appPage.url.searchParams.get('name');
		if (nameParam) name = nameParam;

		const sortParam = $appPage.url.searchParams.get('sort');
		if (sortParam) sort = sortParam as AgencySort;

		onSubmit();
	});

	const onSubmit = () =>
		(agencies = data.data.filter((a) => a.name.toLowerCase().includes(name.toLowerCase())));
</script>

<Head title="Agency List" description="Agency list and search." image="/agencies.png" />

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6 flex flex-wrap items-center justify-between gap-4">
		<h1 class="basis-full text-3xl font-bold sm:basis-auto">
			Agency List <span class="subtitle pointer-events-none text-xl font-normal"
				>— {agencies.length.toLocaleString()}</span
			>
		</h1>
		<div class="flex basis-full items-center justify-end gap-2 sm:basis-auto">
			<InputSearch
				class="w-full"
				placeholder="search agency name..."
				bind:value={name}
				on:enter={onSubmit}
				on:reset={onSubmit}
			/>
			<AgencySortButton bind:value={sort} class="h-5 w-5" />
			<AgencyLayoutButton bind:value={layout} class="h-5 w-5" />
		</div>
	</div>
	<Border class="col-span-6" />
	{#each agencies.sort(agencySorter(sort)) as agency}
		{#if layout === 'grid'}
			<AgencyGrid
				class="col-span-3 sm:col-span-2 md:col-span-1"
				id={agency.id}
				name={agency.name}
				image={agency.image}
			/>
		{:else if layout === 'list'}
			<AgencyList
				class="col-span-6"
				id={agency.id}
				name={agency.name}
				image={agency.image}
				member={agency.member}
				subscriber={agency.subscriber}
			/>
		{/if}
	{/each}
</div>
