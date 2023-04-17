<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import Border from '$lib/components/Border.svelte';
	import UserGroupIcon from '$lib/components/icons/UserGroupIcon.svelte';
	import { vtuberSorter } from '$lib/utils';
	import type { vtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import MembersTimeline from './MembersTimeline.svelte';
	import Layout from './Layout.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';

	export let data: Array<vtuberResponseData>;

	let sort: string = 'debut_date';
	let layout: string = 'timeline';

	$: data = data.sort(vtuberSorter(sort));
</script>

<Accordion title="Members" icon={UserGroupIcon} open>
	<div class="grid grid-cols-6 gap-2">
		{#if data.length === 0}
			<div class="col-span-6 text-center">no vtubers found...</div>
		{:else}
			<div class="col-span-6 flex items-center gap-2">
				<Border>
					<span class="px-4 font-bold whitespace-nowrap">{data.length.toLocaleString()} members</span>
				</Border>
				<VtuberSortButton bind:value={sort} class="w-4 h-4" hideKeys={layout === 'timeline' ? ['name', '-name', 'subscriber', '-subscriber'] : []} />
				<Layout bind:value={layout} bind:sort />
			</div>
			{#if layout === 'timeline'}
				<div class="col-span-6">
					<MembersTimeline {data} bind:sort />
				</div>
			{:else}
				{#each data as vtuber}
					{#if layout === 'grid'}
						<VtuberGrid
							class="col-span-2 sm:col-span-2 md:col-span-1"
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
		{/if}
	</div>
</Accordion>
