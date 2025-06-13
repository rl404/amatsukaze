<script lang="ts">
	import VideoChartLayoutButton from '$lib/components/buttons/VideoChartLayoutButton.svelte';
	import { MonthNames } from '$lib/const';
	import type { VideoChartLayout } from '$lib/types';
	import { Badge, Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import VideoChartCalendar from './VideoChartCalendar.svelte';
	import VideoChartHeatmap from './VideoChartHeatmap.svelte';
	import {
		getHeatmapData,
		getMonthsData,
		type VtuberHeatmap,
		type VtuberVideoMonth
	} from './utils';

	export let vtuber: VtuberResponseData;

	let layout: VideoChartLayout = 'hourly';

	let monthsData: VtuberVideoMonth[] = [];
	let monthI: number = 0;
	let heatmapData: VtuberHeatmap[] = [];

	$: vtuber, (monthsData = getMonthsData(vtuber));
	$: vtuber, monthsData, (monthI = monthsData.findIndex((m) => m.month === new Date().getMonth()));
	$: vtuber, (heatmapData = getHeatmapData(vtuber));
</script>

<Card class="max-w-full gap-4 p-4 sm:p-6">
	<div class="flex items-center justify-between gap-4">
		{#if layout === 'calendar'}
			<div class="flex items-center gap-4">
				{#each monthsData as month, i}
					<button
						class={twMerge(
							'flex items-center gap-2 border-b-2 px-2 pb-2 transition-all hover:opacity-100',
							monthI === i ? 'border-primary-600' : 'border-border opacity-30'
						)}
						onclick={() => (monthI = i)}
					>
						<div class="h3 line-clamp-1">{MonthNames[month.month]}</div>
						<Badge class="hidden md:block">
							{month.days.reduce((sum, d) => sum + d.videos.length, 0).toLocaleString()}
						</Badge>
					</button>
				{/each}
			</div>
		{:else if layout === 'hourly'}
			<div class="border-primary-500 border-l-4 pl-2">
				<div class="flex items-center gap-2">
					<div class="h3 flex items-center gap-2">Upload Frequency</div>
					<Badge>{vtuber.video_count.toLocaleString()}</Badge>
				</div>
				<div>In the last 2 months</div>
			</div>
		{/if}
		<div class={twMerge(layout === 'hourly' && 'pb-3.5')}>
			<VideoChartLayoutButton bind:value={layout} />
		</div>
	</div>
	{#if layout === 'calendar'}
		<VideoChartCalendar data={monthsData[monthI]} />
	{:else if layout === 'hourly'}
		<div class="aspect-chart">
			<VideoChartHeatmap data={heatmapData} />
		</div>
	{/if}
</Card>
