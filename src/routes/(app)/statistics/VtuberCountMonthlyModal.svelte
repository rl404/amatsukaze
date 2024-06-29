<script lang="ts">
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import { MonthNames } from '$lib/const';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { vtuberSorter } from '$lib/utils/utils';
	import axios from 'axios';
	import { Badge, Modal, Spinner } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let open: boolean;
	export let month: number;
	export let year: number;

	let title: string = '';
	let debutData: VtuberResponseData[] = [];
	let retiredData: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let sort: VtuberSort = 'name';
	let layout: VtuberLayout = 'grid';
	let tabI: number = 0;

	$: open, loadData();

	$: tabs = [
		{ label: 'Debut', data: debutData },
		{ label: 'Retired', data: retiredData }
	];

	const loadData = () => {
		if (!open || month === 0 || year === 0) return;

		tabI = 0;
		loading = true;
		error = '';

		title = `${MonthNames[month - 1]}	${year}`;

		axios
			.all([
				axios.get(
					`/api/vtubers?mode=simple&start_debut_month=${month}&end_debut_month=${month}&start_debut_year=${year}&end_debut_year=${year}&limit=-1`
				),
				axios.get(
					`/api/vtubers?mode=simple&start_retired_month=${month}&end_retired_month=${month}&start_retired_year=${year}&end_retired_year=${year}&limit=-1`
				)
			])
			.then(
				axios.spread((d1, d2) => {
					debutData = d1.data.data;
					retiredData = d2.data.data;
				})
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};
</script>

<Modal {title} bind:open size="lg">
	<div class="grid gap-4">
		{#if loading}
			<div class="text-center">
				<Spinner />
			</div>
		{:else if error !== ''}
			<div class="text-center text-red-500">{error}</div>
		{:else}
			<div class="flex items-center justify-between gap-4">
				<div class="flex items-center gap-4">
					{#each tabs as tab, i}
						<button
							class={twMerge(
								'flex items-center gap-2 border-b-2 px-2 pb-2 transition-all hover:opacity-100',
								tabI === i ? 'border-primary-600' : 'border-border opacity-30'
							)}
							on:click={() => (tabI = i)}
						>
							<h4>{tab.label}</h4>
							<Badge>{tab.data.length.toLocaleString()}</Badge>
						</button>
					{/each}
				</div>
				<div class="flex items-center gap-2">
					<VtuberSortButton bind:value={sort} />
					<span class="opacity-50">|</span>
					<VtuberLayoutButton bind:value={layout} />
				</div>
			</div>
			<div class={twMerge('grid grid-cols-24', layout === 'list' ? 'gap-1' : 'gap-2')}>
				{#if tabs[tabI].data.length === 0}
					<div class="col-span-24">No vtubers...</div>
				{:else}
					{#each tabs[tabI].data.sort(vtuberSorter(sort)) as v}
						{#if layout === 'grid'}
							<VtuberGrid id={v.id} name={v.name} image={v.image} delay={500} class="col-span-4" />
						{:else if layout === 'card'}
							<VtuberCard
								id={v.id}
								name={v.name}
								image={v.image}
								agencies={v.agencies.map((a) => a.name)}
								debutDate={v.debut_date ? new Date(v.debut_date) : undefined}
								retirementDate={v.retirement_date ? new Date(v.retirement_date) : undefined}
								delay={500}
								class="col-span-8"
							/>
						{:else if layout === 'list'}
							<VtuberList
								id={v.id}
								name={v.name}
								image={v.image}
								has2d={v.has_2d}
								has3d={v.has_3d}
								agencies={v.agencies.map((a) => a.name)}
								debutDate={v.debut_date ? new Date(v.debut_date) : undefined}
								retirementDate={v.retirement_date ? new Date(v.retirement_date) : undefined}
								class="col-span-24"
							/>
						{/if}
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</Modal>
