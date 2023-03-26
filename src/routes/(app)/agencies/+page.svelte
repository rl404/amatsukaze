<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import AgencyGrid from '$lib/components/layouts/AgencyGrid.svelte';
	import { agencySorter } from '$lib/utils';
	import type { agenciesResponse } from '../../api/agencies/+server';
	import InputSearch from './InputSearch.svelte';
	import Sort from './Sort.svelte';

	export let data: agenciesResponse;

	let agencies = data.data;

	let name: string = '';
	let sort: string = 'name';

	const onSubmit = () => {
		agencies = data.data.filter((a) => a.name.toLowerCase().includes(name.toLowerCase()));
	};

	const onSort = () => {
		agencies = agencies.sort(agencySorter(sort));
	};
</script>

<Head title="Agency List" description="Visualize agency data from wikia to a list." image="/agencies.png" />

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="text-3xl font-bold">
				Agency List <span class="text-xl font-normal opacity-70 hover:opacity-100">— {agencies.length.toLocaleString()}</span>
			</div>
			<div class="flex items-center justify-end gap-2 w-full sm:w-auto">
				<div class="w-full">
					<InputSearch class="w-full" bind:value={name} placeholder="search agency name..." on:submit={onSubmit} />
				</div>
				<div>
					<Sort bind:value={sort} on:submit={onSort} />
				</div>
			</div>
		</div>
	</div>
	<Border class="col-span-6" />
	{#each agencies as agency}
		<AgencyGrid class="col-span-3 sm:col-span-2 md:col-span-1" id={agency.id} name={agency.name} image={agency.image} height={206} />
	{/each}
	<Border class="col-span-6" />
</div>
