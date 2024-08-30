<script lang="ts">
	import { goto } from '$app/navigation';
	import { page as appPage } from '$app/stores';
	import VtuberStatBadge from '$lib/components/badges/VtuberStatBadge.svelte';
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import InfiniteScroll from '$lib/components/commons/InfiniteScroll.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import { DefaultVtubersQuery } from '$lib/const';
	import { type VtuberLayout, type VtuberSort, type VtubersQuery } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Badge, Breadcrumb, BreadcrumbItem, Card, Search, Spinner } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';
	import type { VtuberSearchResponse } from './+page.server';
	import QueryBadges from './QueryBadges.svelte';
	import Schema from './Schema.svelte';
	import SearchModal from './SearchModal.svelte';

	export let data: VtuberSearchResponse;

	let query: VtubersQuery = { ...DefaultVtubersQuery };
	let total: number = 0;
	let layout: VtuberLayout = 'grid';
	let loading: boolean = false;
	let error: string = '';
	let vtubers: VtuberResponseData[] = [];
	let newVtubers: VtuberResponseData[] = [];
	let hasMore: boolean = true;
	let delayTimer: number;

	$: vtubers = [...vtubers, ...newVtubers];
	$: $appPage && onURLChange();

	const onURLChange = () => {
		vtubers = [];
		newVtubers = [];

		const params = $appPage.url.searchParams;

		query = {
			...query,
			names: params.get('names') || '',
			name: params.get('name') || '',
			original_name: params.get('original_name') || '',
			nickname: params.get('nickname') || '',
			exclude_active: params.get('exclude_active') === 'true',
			exclude_retired: params.get('exclude_retired') === 'true',
			start_debut_year: params.get('start_debut_year') || '',
			end_debut_year: params.get('end_debut_year') || '',
			start_retired_year: params.get('start_retired_year') || '',
			end_retired_year: params.get('end_retired_year') || '',
			has_2d:
				params.get('has_2d') === null || params.get('has_2d') === ''
					? undefined
					: params.get('has_2d') === 'true',
			has_3d:
				params.get('has_3d') === null || params.get('has_3d') === ''
					? undefined
					: params.get('has_3d') === 'true',
			character_designer: params.get('character_designer') || '',
			character_2d_modeler: params.get('character_2d_modeler') || '',
			character_3d_modeler: params.get('character_3d_modeler') || '',
			in_agency:
				params.get('in_agency') === null || params.get('in_agency') === ''
					? undefined
					: params.get('in_agency') === 'true',
			agency_id: params.get('agency_id') || '',
			language_id: params.get('language_id') || '',
			channel_types: params.get('channel_types') || '',
			birthday_day: params.get('birthday_day') || '',
			start_birthday_month: params.get('start_birthday_month') || '',
			end_birthday_month: params.get('end_birthday_month') || '',
			blood_types: params.get('blood_types') || '',
			genders: params.get('genders') || '',
			zodiacs: params.get('zodiacs') || '',
			start_subscriber: params.get('start_subscriber') || '',
			end_subscriber: params.get('end_subscriber') || '',
			start_video_count: params.get('start_video_count') || '',
			end_video_count: params.get('end_video_count') || '',
			sort: (params.get('sort') || DefaultVtubersQuery.sort) as VtuberSort
		};

		fetchData();
	};

	const onSearch = () => {
		query = { ...query, page: 1 };

		const queries = Object.entries(query)
			.map((v) => `${v[0]}=${v[1] ?? ''}`)
			.join('&');

		goto(`?${queries}`);
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
				if (newVtubers.length > 0) {
					hasMore = true;
				} else {
					hasMore = false;
				}
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const loadMore = () => {
		query = { ...query, page: query.page + 1 };
		fetchData();
	};

	const onInput = () => {
		vtubers = [];
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			if (query.names.length > 0 && query.names.length < 3) return;
			onSearch();
		}, 500);
	};
</script>

<Head
	title="Vtuber List"
	description="Discover the comprehensive Vtuber list and advanced search tool. Filter by name, status, debut & retirement year, agency, designer, channel type, subscriber count, etc. Sort results by name, subscriber count, debut, or retirement for a tailored Vtuber exploration experience."
	image="/vtubers.png"
/>

<Schema />

<div class="grid gap-4 overflow-hidden">
	<Breadcrumb>
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Vtubers</BreadcrumbItem>
	</Breadcrumb>
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="relative flex items-center gap-4">
			<TextOutline class="absolute -z-10 opacity-20">Vtuber List</TextOutline>
			<h1 class="h1">Vtuber List</h1>
			<Badge large>{total.toLocaleString()}</Badge>
		</div>
		<div class="flex basis-full items-center gap-2 md:basis-auto">
			<Search
				size="md"
				placeholder="vtuber name..."
				disabled={loading}
				bind:value={query.names}
				on:input={onInput}
			/>
			<SearchModal
				{loading}
				bind:query
				on:submit={onSearch}
				agencies={data.agencies.data}
				languages={data.languages.data}
				characterDesigners={data.characterDesigners.data}
				character2dModelers={data.character2dModelers.data}
				character3dModelers={data.character3dModelers.data}
			/>
		</div>
	</div>
	<div class="flex items-center justify-between gap-2">
		<QueryBadges
			bind:query
			on:change={onSearch}
			agencies={data.agencies.data}
			languages={data.languages.data}
		/>
		<div class="flex items-center gap-2">
			<VtuberSortButton bind:value={query.sort} on:change={onSearch} class="hidden sm:flex" />
			<span class="hidden opacity-50 sm:block">|</span>
			<VtuberLayoutButton bind:value={layout} />
		</div>
	</div>
	<Card
		size="none"
		padding="none"
		class={twMerge('grid grid-cols-24 p-2 sm:p-4', layout === 'list' ? 'gap-1' : 'gap-2 sm:gap-4')}
	>
		{#each vtubers as vtuber}
			{#if layout === 'grid'}
				<VtuberGrid
					id={vtuber.id}
					name={vtuber.name}
					image={vtuber.image}
					delay={500}
					class="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 xl:col-span-3"
				>
					<VtuberStatBadge
						slot="badge"
						subscriber={vtuber.subscriber}
						debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
						retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
						monthlySubs={vtuber.monthly_subscriber}
						videoCount={vtuber.video_count}
						sort={query.sort}
					/>
				</VtuberGrid>
			{:else if layout === 'card'}
				<VtuberCard
					id={vtuber.id}
					name={vtuber.name}
					image={vtuber.image}
					agencies={vtuber.agencies.map((a) => a.name)}
					debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
					retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
					delay={500}
					class="col-span-24 sm:col-span-12 xl:col-span-8 2xl:col-span-6"
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
					class="col-span-24"
				/>
			{/if}
		{/each}

		{#if loading}
			<div class="col-span-24 text-center"><Spinner /></div>
		{:else if error !== ''}
			<div class="col-span-24 text-center text-red-500">{error}</div>
		{:else if vtubers.length === 0}
			<div class="col-span-24 text-center">No result...</div>
		{:else}
			<InfiniteScroll {hasMore} window on:loadMore={loadMore} />
		{/if}
	</Card>
</div>
