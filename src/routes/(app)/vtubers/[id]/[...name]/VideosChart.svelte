<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import VideoChartLayoutButton from '$lib/components/buttons/VideoChartLayoutButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import EyeIcon from '$lib/components/icons/EyeIcon.svelte';
	import HomeIcon from '$lib/components/icons/HomeIcon.svelte';
	import type { VideoChartLayout } from '$lib/types';
	import type { SvelteComponent } from 'svelte';
	import type { VtuberResponseDataChannel } from '../../../../api/vtubers/[id]/+server';
	import VideosChartHeatmap from './VideosChartHeatmap.svelte';
	import VideosChartTimeline from './VideosChartTimeline.svelte';

	export let data: VtuberResponseDataChannel[];

	let layout: VideoChartLayout = 'heatmap';
	let chart: SvelteComponent;

	const previousWeek = () => chart.previousWeek();
	const currentWeek = () => chart.currentWeek();
	const nextWeek = () => chart.nextWeek();
	const showAll = () => chart.showAll();
</script>

<div class="grid gap-2">
	<div class="flex items-center gap-2">
		<Border>
			<h3 class="pointer-events-none whitespace-nowrap px-4 font-bold" title="in the last 2 months">
				{layout === 'timeline' ? 'Upload Timeline' : 'Upload Frequency'}
			</h3>
		</Border>
		{#if layout === 'timeline'}
			<IconButton on:click={previousWeek} title="previous week" class="p-1.5">
				<ChevronLeftIcon class="h-4 w-4" />
			</IconButton>
			<IconButton on:click={currentWeek} title="current week" class="p-1.5">
				<HomeIcon class="h-4 w-4" />
			</IconButton>
			<IconButton on:click={nextWeek} title="next week" class="p-1.5">
				<ChevronRightIcon class="h-4 w-4" />
			</IconButton>
			<IconButton on:click={showAll} title="show all" class="p-1.5">
				<EyeIcon class="h-4 w-4" />
			</IconButton>
		{/if}
		<VideoChartLayoutButton bind:value={layout} class="h-4 w-4" />
	</div>
	<div class="aspect-card">
		{#if layout === 'heatmap'}
			<VideosChartHeatmap {data} />
		{:else if layout === 'timeline'}
			<VideosChartTimeline {data} bind:this={chart} />
		{/if}
	</div>
</div>
