<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import Border from '$lib/components/Border.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { getAxiosError } from '$lib/utils';
	import type { vtubersResponse } from '../api/vtubers/+server';
	import type { vtuberResponseData } from '../api/vtubers/[id]/+server';
	import axios from 'axios';
	import InputSearch from './InputSearch.svelte';
	import AdvancedSearch from './AdvancedSearch.svelte';
	import Layout from './Layout.svelte';
	import Sort from './Sort.svelte';

	export let data: vtubersResponse;

	let names = '';
	let page = 1;
	let limit = 36;
	let total = data.meta.total;
	let layoutName: string = 'grid';
	let sort: string = 'name';
	let loading = false;
	let error = '';
	let vtubers: Array<vtuberResponseData> = data.data;
	let newVtubers: Array<vtuberResponseData> = [];
	let hasMore: boolean = true;
	let advQuery: any = {};

	$: vtubers = [...vtubers, ...newVtubers];

	const fetchData = async () => {
		let queries = {
			...advQuery,
			names: names,
			sort: sort,
			page: page,
			limit: limit
		};

		error = '';
		loading = true;

		await axios
			.get(
				`/api/vtubers?${Object.entries(queries)
					.map((v) => `${v[0]}=${v[1] ?? ''}`)
					.join('&')}`
			)
			.then((resp) => {
				newVtubers = resp.data.data;
				total = resp.data.meta.total;
				if (newVtubers.length > 0) {
					hasMore = true;
				} else {
					hasMore = false;
				}
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	};

	const loadMore = () => {
		page++;
		fetchData();
	};

	const onSubmit = () => {
		vtubers = [];
		newVtubers = [];
		page = 1;
		advQuery = {};
		fetchData();
	};

	const onSubmitAdvanced = (d: any) => {
		vtubers = [];
		newVtubers = [];
		page = 1;
		names = '';
		advQuery = d.detail;
		fetchData();
	};

	const onSort = () => {
		vtubers = [];
		newVtubers = [];
		page = 1;
		fetchData();
	};
</script>

<Head title="Vtuber List" description="Visualize vtuber data from wikia to a list." />

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="text-3xl font-bold">
				Vtuber List <span class="text-xl font-normal opacity-70 hover:opacity-100">- {total.toLocaleString()}</span>
			</div>
			<div class="flex items-center justify-end gap-2 w-full sm:w-auto">
				<div class="w-full">
					<InputSearch class="w-full" bind:value={names} placeholder="search vtuber name..." on:submit={onSubmit} />
				</div>
				<div>
					<AdvancedSearch on:submit={onSubmitAdvanced} />
				</div>
				<div>
					<Sort bind:value={sort} on:submit={onSort} />
				</div>
				<div>
					<Layout bind:layoutName />
				</div>
			</div>
		</div>
	</div>
	<Border class="col-span-6" />
	{#each vtubers as vtuber}
		{#if layoutName === 'grid'}
			<VtuberGrid class="col-span-3 sm:col-span-2 md:col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} />
		{:else if layoutName === 'card'}
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
			/>
		{:else if layoutName === 'list'}
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
			/>
		{/if}
	{/each}
	{#if !loading && vtubers.length === 0 && error === ''}
		<div class="col-span-6 text-center">no vtubers found...</div>
	{/if}
	{#if error !== ''}
		<div class="col-span-6 text-center text-red-500">
			{error}
		</div>
	{/if}
	{#if loading}
		<div class="col-span-6">
			<SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
		</div>
	{/if}
	<InfiniteScroll {hasMore} threshold={100} window={true} on:loadMore={loadMore} />
	<Border class="col-span-6" />
</div>
