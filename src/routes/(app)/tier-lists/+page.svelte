<script lang="ts">
	import { goto } from '$app/navigation';
	import { page as appPage } from '$app/stores';
	import TierListSortButton from '$lib/components/buttons/TierListSortButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import InfiniteScroll from '$lib/components/commons/InfiniteScroll.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import TierListGrid from '$lib/components/layouts/TierListGrid.svelte';
	import { defaultTierListQuery, type TierListQuery } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { getTierListsQueryFromURLParam } from '$lib/utils/utils';
	import axios from 'axios';
	import type { TierListsResponse } from './+page.server';
	import type { TierListResponseData } from './[id]/[...title]/+page.server';
	import InputSearch from './InputSearch.svelte';

	export let data: TierListsResponse;

	let query: TierListQuery = { ...defaultTierListQuery };
	let total: number = data.meta.total;
	let loading: boolean = false;
	let error: string = '';
	let tierLists: TierListResponseData[] = data.data;
	let newTierLists: TierListResponseData[] = [];
	let hasMore: boolean = true;

	$: tierLists = [...tierLists, ...newTierLists];
	$: $appPage.url.searchParams, onURLChange();

	const onURLChange = () => {
		const params = Array.from($appPage.url.searchParams.entries());
		if (params.length === 0) {
			query = { ...defaultTierListQuery };
			total = data.meta.total;
			tierLists = data.data;
			newTierLists = [];
			hasMore = true;
			return;
		}

		query = getTierListsQueryFromURLParam($appPage.url.searchParams);

		tierLists = [];
		newTierLists = [];
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
			.get(`/api/tier-lists?${queries}`)
			.then((resp) => {
				newTierLists = resp.data.data;
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
	title="Vtuber Tier List"
	description="Explore the ultimate Vtuber tier list search page. Easily find by title or description, and sort by title or latest updates. Discover top-tier Vtubers and stay updated with ease."
	image=""
/>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-12 flex flex-wrap items-center justify-between gap-4">
		<h1 class="basis-full text-3xl font-bold sm:basis-auto">
			Tier List <span class="subtitle pointer-events-none text-xl font-normal"
				>— {total.toLocaleString()}</span
			>
		</h1>
		<div class="flex basis-full items-center justify-end gap-2 sm:basis-auto">
			<InputSearch
				class="w-full"
				placeholder="search title/description..."
				bind:value={query.query}
				on:enter={onSubmit}
				on:reset={onSubmit}
			/>
			<TierListSortButton class="h-5 w-5" bind:value={query.sort} on:change={onSubmit} />
		</div>
	</div>
	<Border class="col-span-12" />
	{#each tierLists as tierList}
		<TierListGrid data={tierList} class="col-span-6 sm:col-span-4 lg:col-span-3" />
	{/each}
	{#if loading}
		<div class="col-span-12">
			<Loading class="h-8 w-8" />
		</div>
	{:else if error !== ''}
		<div class="col-span-12 text-center text-red-500">
			{error}
		</div>
	{:else if tierLists.length === 0}
		<div class="col-span-12 text-center">no tier lists found...</div>
	{/if}
	<InfiniteScroll {hasMore} threshold={100} window on:loadMore={loadMore} />
</div>
