<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import VideoIcon from '$lib/components/icons/VideoIcon.svelte';
	import type { vtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import Videos from './Videos.svelte';
	import VideosChart from './VideosChart.svelte';

	export let data: vtuberResponseData;
</script>

<Accordion title="Videos" icon={VideoIcon}>
	{#if data.channels.length === 0}
		<div class="text-center">no channel...</div>
	{:else if data.channels.reduce((res, c) => {
		return (res += c.videos.length);
	}, 0) === 0}
		<div class="text-center">no recent videos...</div>
	{:else}
		<div class="grid gap-2">
			<VideosChart data={data.channels} />
			<Videos data={data.channels} />
		</div>
	{/if}
</Accordion>
