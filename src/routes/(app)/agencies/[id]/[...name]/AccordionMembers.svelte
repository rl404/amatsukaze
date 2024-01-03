<script lang="ts">
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import UserGroupIcon from '$lib/components/icons/UserGroupIcon.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import { vtuberSorter } from '$lib/utils/utils';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import MembersTImeline from './MembersTImeline.svelte';
	import VtuberLayoutButton from './VtuberLayoutButton.svelte';

	export let data: VtuberResponseData[];

	let sort: VtuberSort = 'debut_date';
	let layout: VtuberLayout = 'timeline';
</script>

<Accordion title="Members" icon={UserGroupIcon} open>
	<div class="grid grid-cols-6 gap-2">
		{#if data.length === 0}
			<div class="col-span-6 text-center">no vtubers found...</div>
		{:else}
			<div class="col-span-6 flex items-center gap-2">
				<Border>
					<span class="pointer-events-none whitespace-nowrap px-4 font-bold"
						>{data.length.toLocaleString()} members</span
					>
				</Border>
				<VtuberSortButton
					bind:value={sort}
					class="h-4 w-4"
					hideKeys={layout === 'timeline' ? ['name', '-name', 'subscriber', '-subscriber'] : []}
				/>
				<VtuberLayoutButton bind:value={layout} bind:sort />
			</div>
			{#if layout === 'timeline'}
				<div class="col-span-6">
					<MembersTImeline {data} bind:sort />
				</div>
			{:else}
				{#each data.sort(vtuberSorter(sort)) as vtuber}
					{#if layout === 'grid'}
						<VtuberGrid
							class="col-span-2 text-sm sm:col-span-2 md:col-span-1"
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
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
							retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
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
							retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
						/>
					{/if}
				{/each}
			{/if}
		{/if}
	</div>
</Accordion>
