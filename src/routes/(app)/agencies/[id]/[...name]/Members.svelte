<script lang="ts">
	import VtuberLayoutButton from '$lib/components/buttons/VtuberLayoutButton.svelte';
	import VtuberSortButton from '$lib/components/buttons/VtuberSortButton.svelte';
	import VtuberCard from '$lib/components/layouts/VtuberCard.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import VtuberList from '$lib/components/layouts/VtuberList.svelte';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import { vtuberSorter } from '$lib/utils/utils';
	import { Badge, Card } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import MemberChart from './MemberChart.svelte';
	import MemberTimeline from './MemberTimeline.svelte';

	export let vtubers: VtuberResponseData[];

	let layout: VtuberLayout = 'timeline';
	let sort: VtuberSort = 'debut_date';

	const onChangeLayout = (v: CustomEvent<VtuberLayout>) => {
		v.detail === 'timeline' && (sort = 'debut_date');
	};
</script>

<div class="grid gap-4">
	<Card size="none" class="gap-4">
		<div class="flex items-center justify-between gap-4">
			<div>
				<div class="flex items-center gap-2">
					<h3 class="h3">Member Count</h3>
					<Badge class="hidden sm:block">{vtubers.length.toLocaleString()}</Badge>
				</div>
				<div>By monthly</div>
			</div>
			<div class="flex items-center gap-4 text-center">
				<div>
					<div class="h3">{vtubers.filter((v) => !v.retirement_date).length.toLocaleString()}</div>
					<h4 class="text-green-500">Active</h4>
				</div>
				<div>
					<div class="h3">{vtubers.filter((v) => v.retirement_date).length.toLocaleString()}</div>
					<h4 class="text-red-500">Retired</h4>
				</div>
			</div>
		</div>
		<div class="hidden aspect-chart xl:block">
			<MemberChart {vtubers} bind:layout />
		</div>
	</Card>
	<Card size="none" class="gap-4">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-2">
				<h3 class="h3">Member {layout === 'timeline' ? 'Timeline' : 'List'}</h3>
				<Badge>{vtubers.length.toLocaleString()}</Badge>
			</div>
			<div class="flex items-center gap-2">
				<VtuberSortButton
					bind:value={sort}
					class="hidden sm:flex"
					hideKeys={layout === 'timeline'
						? [
								'name',
								'-name',
								'subscriber',
								'-subscriber',
								'monthly_subscriber',
								'-monthly_subscriber',
								'video_count',
								'-video_count'
							]
						: []}
				/>
				<span class="hidden opacity-50 sm:block">|</span>
				<VtuberLayoutButton bind:value={layout} timeline on:change={onChangeLayout} />
			</div>
		</div>
		{#if layout === 'timeline'}
			<MemberTimeline {vtubers} {sort} />
		{:else}
			<div class="grid grid-cols-6 gap-2">
				{#each vtubers.sort(vtuberSorter(sort)) as vtuber}
					{#if layout === 'grid'}
						<VtuberGrid
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							delay={500}
							class="col-span-2 md:col-span-1"
						/>
					{:else if layout === 'card'}
						<VtuberCard
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							agencies={vtuber.agencies.map((a) => a.name)}
							debutDate={vtuber.debut_date ? new Date(vtuber.debut_date) : undefined}
							retirementDate={vtuber.retirement_date ? new Date(vtuber.retirement_date) : undefined}
							delay={500}
							class="col-span-6 md:col-span-3 2xl:col-span-2"
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
							class="col-span-6"
						/>
					{/if}
				{/each}
			</div>
		{/if}
	</Card>
</div>
