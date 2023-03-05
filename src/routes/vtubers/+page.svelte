<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import VtuberGrid from '$lib/components/VtuberGrid.svelte';
	import VtuberCard from '$lib/components/VtuberCard.svelte';
	import Border from '$lib/components/Border.svelte';
	import VtuberList from '$lib/components/VtuberList.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import { getAxiosError } from '$lib/utils';
	import type { vtubersResponse } from '../api/vtubers/+server';
	import type { vtuberResponseData } from '../api/vtubers/[id]/+server';
	import axios from 'axios';
	import InputSearch from './InputSearch.svelte';
	import AdvancedSearch from './AdvancedSearch.svelte';
	import Layout from './Layout.svelte';

	export let data: vtubersResponse;

	let name = '';
	let page = 1;
	let limit = 36;
	let total = data.meta.total;
	let layoutName: string = 'grid';
	let loading = false;
	let error = '';
	let vtubers: Array<vtuberResponseData> = data.data;
	let newVtubers: Array<vtuberResponseData> = [];
	let hasMore: boolean = true;

	$: vtubers = [...vtubers, ...newVtubers];

	const fetchData = async () => {
		error = '';
		loading = true;

		await axios
			.get(`/api/vtubers?name=${name}&page=${page}&limit=${limit}`)
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
					<InputSearch class="w-full" bind:value={name} placeholder="search vtuber name..." on:submit={onSubmit} />
				</div>
				<div title="advanced search" class="hover:opacity-70 cursor-pointer">
					<AdvancedSearch />
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
		{/if}
		{#if layoutName === 'card'}
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
		{/if}
		{#if layoutName === 'list'}
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
	{#if vtubers.length === 0}
		<div class="col-span-6 text-center">no vtubers found...</div>
	{/if}
	{#if error !== ''}
		<div class="col-span-6 text-center text-red-500">
			{error}
		</div>
	{/if}
	{#if loading}
		<div class="col-span-6">
			<svg
				aria-hidden="true"
				class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		</div>
	{/if}
	<InfiniteScroll {hasMore} threshold={100} window={true} on:loadMore={loadMore} />
	<Border class="col-span-6" />
</div>
