<script lang="ts">
	import { page as appPage } from '$app/stores';
	import AgencyLayoutButton from '$lib/components/buttons/AgencyLayoutButton.svelte';
	import AgencySortButton from '$lib/components/buttons/AgencySortButton.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import AgencyGrid from '$lib/components/layouts/AgencyGrid.svelte';
	import AgencyList from '$lib/components/layouts/AgencyList.svelte';
	import type { AgencyLayout, AgencySort } from '$lib/types';
	import { agencySorter } from '$lib/utils/utils';
	import { Badge, Breadcrumb, BreadcrumbItem, Card, Search } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { AgenciesResponse } from '../../api/agencies/+server';
	import type { AgencyResponseData } from '../../api/agencies/[id]/+server';
	import QueryBadges from './QueryBadges.svelte';

	export let data: AgenciesResponse;

	let agencies: AgencyResponseData[] = data.data;
	let name: string = '';
	let sort: AgencySort = 'name';
	let layout: AgencyLayout = 'grid';
	let delayTimer: number;

	onMount(() => {
		const params = $appPage.url.searchParams;
		name = params.get('name') || '';
		onSearch();
	});

	const onSearch = () =>
		(agencies = data.data
			.filter((a) => a.name.toLowerCase().includes(name.toLowerCase()))
			.sort(agencySorter(sort)));

	const onInput = () => {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			if (name.length > 0 && name.length < 3) return;
			onSearch();
		}, 1000);
	};
</script>

<Head
	title="Agency List"
	description="Discover top Vtuber agencies with searchable, sortable list. Find by name, sort by member count, total subscribers, and explore the agencies in the virtual realm."
	image="/agencies.png"
/>

<div class="grid gap-4">
	<Breadcrumb>
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Agencies</BreadcrumbItem>
	</Breadcrumb>
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			<h1>Agency List</h1>
			<Badge large>{agencies.length.toLocaleString()}</Badge>
		</div>
		<div class="flex basis-full items-center gap-2 md:basis-auto">
			<Search size="md" placeholder="agency name..." bind:value={name} on:input={onInput} />
		</div>
	</div>
	<div class="flex items-center justify-between gap-2">
		<QueryBadges bind:name on:change={onSearch} />
		<div class="flex items-center gap-2">
			<AgencySortButton bind:value={sort} on:change={onSearch} />
			<span class="opacity-50">|</span>
			<AgencyLayoutButton bind:value={layout} />
		</div>
	</div>
	<Card
		size="none"
		padding="none"
		class={twMerge('grid grid-cols-6 p-2 sm:p-4', layout === 'list' ? 'gap-1' : 'gap-2 sm:gap-4')}
	>
		{#each agencies as agency}
			{#if layout === 'grid'}
				<AgencyGrid
					id={agency.id}
					name={agency.name}
					image={agency.image}
					delay={500}
					class="col-span-3 sm:col-span-2 xl:col-span-1"
				/>
			{:else if layout === 'list'}
				<AgencyList
					id={agency.id}
					name={agency.name}
					image={agency.image}
					member={agency.member}
					subscriber={agency.subscriber}
					class="col-span-6"
				/>
			{/if}
		{/each}
	</Card>
</div>
