<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import EyeIcon from '$lib/components/icons/EyeIcon.svelte';
	import HomeIcon from '$lib/components/icons/HomeIcon.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtuberResponseDataChannel } from '../../../../api/vtubers/[id]/+server';
	import VideosChartHeatmap from './VideosChartHeatmap.svelte';
	import VideosChartLayoutButton from './VideosChartLayoutButton.svelte';
	import VideosChartTimeline from './VideosChartTimeline.svelte';

	export let data: Array<vtuberResponseDataChannel>;

	let layout = 'heatmap';

	let chartTimeline: SvelteComponent;
	let chartHeatmap: SvelteComponent;

	const previousWeek = () => {
		chartTimeline.previousWeek();
	};
	const currentWeek = () => {
		chartTimeline.currentWeek();
	};
	const nextWeek = () => {
		chartTimeline.nextWeek();
	};
	const showAll = () => {
		chartTimeline.showAll();
	};
</script>

<div class="grid gap-2">
	<div class="flex gap-2">
		<Border>
			<span class="px-4 font-bold whitespace-nowrap" title="in the last 2 months"
				>{layout === 'timeline' ? 'Upload Timeline' : 'Upload Frequency'}</span
			>
		</Border>
		{#if layout === 'timeline'}
			<IconButton on:click={previousWeek} title="previous week"><ChevronLeftIcon class="w-4 h-4" /></IconButton>
			<IconButton on:click={currentWeek} title="current week"><HomeIcon class="w-4 h-4" /></IconButton>
			<IconButton on:click={nextWeek} title="next week"><ChevronRightIcon class="w-4 h-4" /></IconButton>
			<IconButton on:click={showAll} title="show all"><EyeIcon class="w-4 h-4" /></IconButton>
		{/if}
		<VideosChartLayoutButton bind:value={layout} class="w-4 h-4" />
	</div>
	{#if layout === 'timeline'}
		<div><VideosChartTimeline {data} bind:this={chartTimeline} /></div>
	{:else if layout === 'heatmap'}
		<div><VideosChartHeatmap {data} bind:this={chartHeatmap} /></div>
	{/if}
</div>
