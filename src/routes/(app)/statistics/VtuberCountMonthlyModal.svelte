<script lang="ts">
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { MonthNames } from '$lib/utils/const';
	import { vtuberSorter } from '$lib/utils/utils';
	import axios from 'axios';
	import type { SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	let modal: SvelteComponent;
	let title: string = '';
	let debutData: VtuberResponseData[] = [];
	let retiredData: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let sort: VtuberSort = 'name';
	let layout: VtuberLayout = 'grid';

	const loadData = (year: number, month: number) => {
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

	export const toggleOpen = (year: number, month: number) => {
		if (year === 0 || month === 0) return;
		modal.toggleOpen();
		loadData(year, month);
	};

	$: tabs = [
		{ label: `Debut (${debutData.length.toLocaleString()})`, active: true },
		{ label: `Retire (${retiredData.length.toLocaleString()})`, active: false }
	];

	const onChangeTab = (i: number) => {
		tabs.forEach((_, j) => (tabs[j].active = false));
		tabs[i].active = true;
	};
</script>

<Modal bind:this={modal} class="max-w-3xl">
	<div slot="header" class="text-xl font-bold">{title}</div>

	<div slot="body" class="grid gap-4 p-4">
		{#if loading}
			<div><Loading class="h-8 w-8" /></div>
		{:else if error !== ''}
			<div class="text-center text-red-500">{error}</div>
		{:else}
			<div
				class="flex items-center justify-between gap-2 border-b border-border dark:border-border-dark"
			>
				<div class="flex items-center gap-2">
					{#each tabs as tab, i}
						<button
							class="{tab.active
								? 'border-b-4 border-primary dark:border-primary-dark'
								: 'subtitle'} clickable p-2 pb-4 text-lg font-bold"
							on:click={() => onChangeTab(i)}>{tab.label}</button
						>
					{/each}
				</div>
				<div class="flex items-center gap-2">
					<VtuberSortButton bind:value={sort} class="h-4 w-4" />
					<VtuberLayoutButton bind:value={layout} class="h-4 w-4" />
				</div>
			</div>
			{#each [debutData, retiredData] as vtubers, i}
				<div class="grid grid-cols-6 gap-2" class:hidden={!tabs[i].active}>
					{#if vtubers.length === 0}
						<div class="col-span-6 text-center">no vtubers found...</div>
					{:else}
						{#each vtubers.sort(vtuberSorter(sort)) as vtuber}
							{#if layout === 'grid'}
								<VtuberGrid
									class="col-span-3 text-sm sm:col-span-2 md:col-span-1"
									id={vtuber.id}
									name={vtuber.name}
									image={vtuber.image}
									subscriber={vtuber.subscriber}
								/>
							{:else if layout === 'card'}
								<VtuberCard
									class="col-span-6 sm:col-span-3 sm:text-xs lg:col-span-2"
									id={vtuber.id}
									name={vtuber.name}
									image={vtuber.image}
									has2d={vtuber.has_2d}
									has3d={vtuber.has_3d}
									agencies={vtuber.agencies.map((a) => a.name)}
									debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
									retirementDate={vtuber.retirement_date
										? new Date(vtuber.retirement_date)
										: undefined}
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
									retirementDate={vtuber.retirement_date
										? new Date(vtuber.retirement_date)
										: undefined}
								/>
							{/if}
						{/each}
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</Modal>
