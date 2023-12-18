<script lang="ts">
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import VideoIcon from '$lib/components/icons/VideoIcon.svelte';
	import type { VtuberResponseDataChannel } from '../../../../api/vtubers/[id]/+server';
	import Videos from './Videos.svelte';
	import VideosChart from './VideosChart.svelte';

	export let data: VtuberResponseDataChannel[];
</script>

<Accordion title="Videos" icon={VideoIcon}>
	{#if data.length === 0}
		<div class="text-center">no channel...</div>
	{:else if data.reduce((res, c) => (res += c.videos.length), 0) === 0}
		<div class="text-center">no recent videos...</div>
	{:else}
		<div class="grid gap-4">
			<VideosChart {data} />
			<Videos {data} />
		</div>
	{/if}
</Accordion>
