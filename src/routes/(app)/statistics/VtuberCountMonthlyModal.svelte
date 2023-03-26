<script lang="ts">
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { vtuberSorter } from '$lib/utils';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import Layout from './Layout.svelte';
	import Sort from './Sort.svelte';

	export let title: string = 'Vtubers';
	export let data: { debut: Array<vtuberResponseData>; retired: Array<vtuberResponseData> };

	let modal: SvelteComponent;
	let sort: string = 'name';
	let layout: string = 'grid';

	export const toggleOpen = () => {
		modal.toggleOpen();
	};

	$: tabs = [
		{ label: `Debut (${data.debut.length.toLocaleString()})`, active: true },
		{ label: `Retired (${data.retired.length.toLocaleString()})`, active: false }
	];

	const onChangeTab = (i: number) => {
		tabs.forEach((_, j) => (tabs[j].active = false));
		tabs[i].active = true;
	};

	const onSort = () => {
		data.debut = data.debut.sort(vtuberSorter(sort));
		data.retired = data.retired.sort(vtuberSorter(sort));
	};

	onMount(() => {
		onSort();
	});
</script>

<Modal bind:this={modal} maxWidthClass="max-w-3xl">
	<div slot="title">
		{title}
	</div>

	<div slot="body" class="p-4 grid gap-4">
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
				<div><Sort bind:value={sort} on:submit={onSort} /></div>
				<div><Layout bind:layoutName={layout} /></div>
			</div>
		</div>
		<div class="grid grid-cols-6 gap-2" class:hidden={!tabs[0].active}>
			{#if data.debut.length === 0}
				<div class="col-span-6 text-center">No vtuber...</div>
			{:else}
				{#each data.debut as vtuber}
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
			{#if data.retired.length === 0}
				<div class="col-span-6 text-center">No vtuber...</div>
			{:else}
				{#each data.retired as vtuber}
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
	</div>
</Modal>
