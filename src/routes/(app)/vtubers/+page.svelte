<script lang="ts">
	import { goto } from '$app/navigation';
	import { page as appPage } from '$app/stores';
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import InfiniteScroll from '$lib/components/commons/InfiniteScroll.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import { defaultVtubersQuery, type VtuberLayout, type VtubersQuery } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { compactInt, getVtubersQueryFromURLParam } from '$lib/utils/utils';
	import axios from 'axios';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';
	import type { VtuberSearchResponse } from './+page.server';
	import AdvancedSearch from './AdvancedSearch.svelte';
	import InputSearch from './InputSearch.svelte';

	export let data: VtuberSearchResponse;

	let query: VtubersQuery = { ...defaultVtubersQuery };
	let total: number = data.vtubers.meta.total;
	let layout: VtuberLayout = 'grid';
	let loading: boolean = false;
	let error: string = '';
	let vtubers: VtuberResponseData[] = data.vtubers.data;
	let newVtubers: VtuberResponseData[] = [];
	let hasMore: boolean = true;

	$: vtubers = [...vtubers, ...newVtubers];
	$: $appPage.url.searchParams, onURLChange();

	const onURLChange = () => {
		const params = Array.from($appPage.url.searchParams.entries());
		if (params.length === 0) {
			query = { ...defaultVtubersQuery };
			total = data.vtubers.meta.total;
			vtubers = data.vtubers.data;
			newVtubers = [];
			hasMore = true;
			return;
		}

		query = getVtubersQueryFromURLParam($appPage.url.searchParams);

		vtubers = [];
		newVtubers = [];
		query.page = 1;

		fetchData();
	};

	const fetchData = () => {
		loading = true;
		error = '';

		const queries = Object.entries(query)
			.map((v) => `${v[0]}=${v[1] ?? ''}`)
			.join('&');

		axios
			.get(`/api/vtubers?${queries}`)
			.then((resp) => {
				newVtubers = resp.data.data;
				total = resp.data.meta.total;
				hasMore = resp.data.data.length > 0;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const loadMore = () => {
		query.page++;
		fetchData();
	};

	const onSubmit = () => {
		const queries = Object.entries(query)
			.map((v) => `${v[0]}=${v[1] ?? ''}`)
			.join('&');

		goto(`?${queries}`);
	};
</script>

<Head
	title="Vtuber List"
	description="Discover the comprehensive Vtuber list and advanced search tool. Filter by name, status, debut & retirement year, agency, designer, channel type, subscriber count, etc. Sort results by name, subscriber count, debut, or retirement for a tailored Vtuber exploration experience."
	image="/vtubers.png"
/>

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6 flex flex-wrap items-center justify-between gap-4">
		<h1 class="basis-full text-3xl font-bold sm:basis-auto">
			Vtuber List <span class="subtitle pointer-events-none text-xl font-normal"
				>— {total.toLocaleString()}</span
			>
		</h1>
		<div class="flex basis-full items-center justify-end gap-2 sm:basis-auto">
			<InputSearch
				class="w-full"
				placeholder="search vtuber name..."
				disabled={loading}
				bind:value={query.names}
				on:enter={onSubmit}
				on:reset={onSubmit}
			/>
			<AdvancedSearch
				bind:query
				on:submit={onSubmit}
				agencies={data.agencies.data.map((a) => a.name)}
				characterDesigners={data.characterDesigners.data}
				character2dModelers={data.character2dModelers.data}
				character3dModelers={data.character3dModelers.data}
				startDebutYear={!data.startDebut.data[0].debut_date
					? 2000
					: new Date(data.startDebut.data[0].debut_date).getFullYear()}
				endDebutYear={new Date().getFullYear()}
				startRetiredYear={!data.startRetired.data[0].retirement_date
					? 2000
					: new Date(data.startRetired.data[0].retirement_date).getFullYear()}
				endRetiredYear={new Date().getFullYear()}
			/>
			<VtuberSortButton class="h-5 w-5" bind:value={query.sort} on:change={onSubmit} />
			<VtuberLayoutButton class="h-5 w-5" bind:value={layout} />
		</div>
	</div>
	<Border class="col-span-6" />
	{#each vtubers as vtuber}
		{#if layout === 'grid'}
			<VtuberGrid
				class="col-span-3 sm:col-span-2 md:col-span-1"
				id={vtuber.id}
				name={vtuber.name}
				image={vtuber.image}
				label={query.sort === 'video_count' || query.sort === '-video_count'
					? vtuber.video_count.toLocaleString()
					: compactInt(vtuber.subscriber)}
				videoCount={vtuber.video_count}
				retirementDate={vtuber.retirement_date}
				showBorder={query.sort === 'video_count' || query.sort === '-video_count'}
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
				debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
				retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
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
				debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
				retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
			/>
		{/if}
	{/each}
	{#if loading}
		<div class="col-span-6">
			<Loading class="h-8 w-8" />
		</div>
	{:else if error !== ''}
		<div class="col-span-6 text-center text-red-500">
			{error}
		</div>
	{:else if vtubers.length === 0}
		<div class="col-span-6 text-center">no vtubers found...</div>
	{/if}
	<InfiniteScroll {hasMore} threshold={100} window on:loadMore={loadMore} />
</div>
