<script lang="ts">
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { getAxiosError, monthNames, vtuberSorter } from '$lib/utils';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import axios from 'axios';
	import type { SvelteComponent } from 'svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let modal: SvelteComponent;
	let title: string = '';
	let debutData: Array<vtuberResponseData> = [];
	let retireData: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';
	let sort: string = 'name';
	let layout: string = 'grid';

	const loadData = (year: number, month: number) => {
		loading = true;

		if (year === 0 || month === 0) return;

		title = `${monthNames[month - 1]}	${year}`;

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
					retireData = d2.data.data;
				})
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	$: tabs = [
		{ label: `Debut (${debutData.length.toLocaleString()})`, active: true },
		{ label: `Retire (${retireData.length.toLocaleString()})`, active: false }
	];

	const onChangeTab = (i: number) => {
		tabs.forEach((_, j) => (tabs[j].active = false));
		tabs[i].active = true;
	};

	const onSort = () => {
		debutData = debutData.sort(vtuberSorter(sort));
		retireData = retireData.sort(vtuberSorter(sort));
	};

	export const toggleOpen = (year: number, month: number) => {
		modal.toggleOpen();
		loadData(year, month);
	};
</script>

<Modal bind:this={modal} maxWidthClass="max-w-3xl">
	<div slot="title">
		{title}
	</div>

	<div slot="body" class="p-4 grid gap-4">
		{#if loading}
			<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
		{:else if error !== ''}
			<div class="text-center text-red-500">{error}</div>
		{:else}
			<div class="flex justify-between items-center gap-2 border-b border-neutral-200 dark:border-neutral-600">
				<div class="flex items-center gap-2">
					{#each tabs as tab, i}
						<button
							class="p-2 pb-4 font-bold text-lg hover:opacity-70 {tab.active ? 'border-b-4 border-pink-500 dark:border-indigo-600' : 'opacity-50'}"
							on:click={() => onChangeTab(i)}>{tab.label}</button
						>
					{/each}
				</div>
				<div class="flex items-center gap-2">
					<VtuberSortButton bind:value={sort} on:submit={onSort} class="w-4 h-4" />
					<VtuberLayoutButton bind:value={layout} class="w-4 h-4" />
				</div>
			</div>
			<div class="grid grid-cols-6 gap-2" class:hidden={!tabs[0].active}>
				{#if debutData.length === 0}
					<div class="col-span-6 text-center">No vtuber...</div>
				{:else}
					{#each debutData as vtuber}
						{#if layout === 'grid'}
							<VtuberGrid
								class="col-span-3 sm:col-span-2 md:col-span-1"
								id={vtuber.id}
								name={vtuber.name}
								image={vtuber.image}
								height={206}
								smallText
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
			</div>
			<div class="grid grid-cols-6 gap-4" class:hidden={!tabs[1].active}>
				{#if retireData.length === 0}
					<div class="col-span-6 text-center">No vtuber...</div>
				{:else}
					{#each retireData as vtuber}
						{#if layout === 'grid'}
							<VtuberGrid
								class="col-span-3 sm:col-span-2 md:col-span-1"
								id={vtuber.id}
								name={vtuber.name}
								image={vtuber.image}
								height={206}
								smallText
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
			</div>
		{/if}
	</div>
</Modal>
