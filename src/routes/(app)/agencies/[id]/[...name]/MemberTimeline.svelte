<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Timeline from '$lib/components/timelines/Timeline.svelte';
	import TimelineItem from '$lib/components/timelines/TimelineItem.svelte';
	import type { VtuberSort } from '$lib/types';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import { getTimelineData, type AgencyMemberTimeline } from './utils';

	export let vtubers: VtuberResponseData[];
	export let sort: VtuberSort;

	let timelineData: AgencyMemberTimeline[] = [];

	$: vtubers, (timelineData = getTimelineData(vtubers, sort[0] !== '-'));
</script>

<Timeline>
	{#each timelineData as d}
		<TimelineItem id={d.id}>
			<div
				slot="dot"
				class={twMerge(
					'size-3 rounded-full bg-gradient-to-t md:bg-gradient-to-r',
					d.retired.length > 0 ? 'from-red-500' : 'from-green-500',
					d.debut.length > 0 ? 'to-green-500' : 'to-red-500'
				)}
			/>

			<div slot="left" class="flex flex-col gap-2 p-4" class:hidden={d.retired.length === 0}>
				<div class="flex items-center gap-1 md:flex-row-reverse md:text-right">
					<h4 class="h4 text-red-500">Retired</h4>
					<span>({d.retired.length.toLocaleString()})</span>
					<span>—</span>
					<span>{d.date}</span>
				</div>
				<div
					class="ltr md:rtl grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
				>
					{#each d.retired as vtuber (vtuber.id)}
						<VtuberGrid
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							delay={500}
							class="ltr"
						/>
					{/each}
				</div>
			</div>

			<div slot="right" class="flex flex-col gap-2 p-4" class:hidden={d.debut.length === 0}>
				<div class="flex items-center gap-1">
					<h4 class="h4 text-green-500">Debut</h4>
					<span>({d.debut.length.toLocaleString()})</span>
					<span>—</span>
					<span>{d.date}</span>
				</div>
				<div
					class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
				>
					{#each d.debut as vtuber (vtuber.id)}
						<VtuberGrid id={vtuber.id} name={vtuber.name} image={vtuber.image} delay={500} />
					{/each}
				</div>
			</div>
		</TimelineItem>
	{/each}
</Timeline>
