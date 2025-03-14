<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Timeline from '$lib/components/timelines/Timeline.svelte';
	import TimelineItem from '$lib/components/timelines/TimelineItem.svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';
	import { getTimelineData, type EventMonth } from './utils';

	export let month: number;
	export let birthdayData: VtuberResponseData[];
	export let anniversaryData: VtuberResponseData[];

	let timelineData: EventMonth[] = [];

	$: birthdayData,
		anniversaryData,
		(timelineData = getTimelineData(month, birthdayData, anniversaryData));
</script>

<Timeline>
	{#each timelineData as d}
		<TimelineItem id={d.id}>
			<div slot="dot" class="flex items-center gap-3">
				<div
					class="bg-primary-600 top-10 block size-3 rounded-full md:absolute md:left-1/2 md:-translate-x-1/2 md:transform"
				/>
				<h3 class="h3 bg-white dark:bg-gray-800">{d.date}</h3>
			</div>

			<div slot="left" class="flex flex-col gap-2 p-4 md:mt-10">
				<div class="flex items-center gap-1 md:flex-row-reverse md:text-right">
					<h4 class="h4 text-indigo-500">Anniversary</h4>
					<span>({d.anniversary.length.toLocaleString()})</span>
				</div>
				<div
					class="ltr md:rtl grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
				>
					{#each d.anniversary as vtuber}
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

			<div slot="right" class="mt-10 flex flex-col gap-2 p-4">
				<div class="flex items-center gap-1">
					<h4 class="h4 text-pink-500">Birthday</h4>
					<span>({d.birthday.length.toLocaleString()})</span>
				</div>
				<div
					class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
				>
					{#each d.birthday as vtuber}
						<VtuberGrid id={vtuber.id} name={vtuber.name} image={vtuber.image} delay={500} />
					{/each}
				</div>
			</div>
		</TimelineItem>
	{/each}
</Timeline>
