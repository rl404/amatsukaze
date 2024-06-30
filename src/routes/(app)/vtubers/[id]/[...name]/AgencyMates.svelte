<script lang="ts">
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import { vtuberSorter } from '$lib/utils/utils';
	import { Badge, Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtubersResponse } from '../../../../api/vtubers/+server';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let vtuber: VtuberResponseData;
	export let agencies: VtubersResponse[];

	let layout: VtuberLayout = 'grid';
	let sort: VtuberSort = 'name';
	let tabI: number = 0;
</script>

<Card size="none" class="gap-4">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			{#each vtuber.agencies as agency, i}
				<button
					class={twMerge(
						'flex items-center gap-2 border-b-2 px-2 pb-2 transition-all hover:opacity-100',
						tabI === i ? 'border-primary-600' : 'border-border opacity-30'
					)}
					on:click={() => (tabI = i)}
				>
					<h3 class="h3 line-clamp-1">{agency.name}</h3>
					<Badge>{agencies[i].data.length.toLocaleString()}</Badge>
				</button>
			{/each}
		</div>
		<div class="hidden items-center gap-2 lg:flex">
			<VtuberSortButton bind:value={sort} />
			<span class="opacity-50">|</span>
			<VtuberLayoutButton bind:value={layout} />
		</div>
	</div>
	<div class={twMerge('grid grid-cols-24', layout === 'list' ? 'gap-1' : 'gap-2')}>
		{#each agencies[tabI].data.sort(vtuberSorter(sort)) as v}
			{#if layout === 'grid'}
				<VtuberGrid
					id={v.id}
					name={v.name}
					image={v.image}
					delay={500}
					class="col-span-8 sm:col-span-6 lg:col-span-4 2xl:col-span-3"
				/>
			{:else if layout === 'card'}
				<VtuberCard
					id={v.id}
					name={v.name}
					image={v.image}
					agencies={v.agencies.map((a) => a.name)}
					debutDate={v.debut_date ? new Date(v.debut_date) : undefined}
					retirementDate={v.retirement_date ? new Date(v.retirement_date) : undefined}
					delay={500}
					class="col-span-24 md:col-span-12 lg:col-span-24 xl:col-span-12 2xl:col-span-8"
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
	</div>
</Card>
