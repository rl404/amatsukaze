<script lang="ts">
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import VideoCharts from './VideoCharts.svelte';
	import VideoList from './VideoList.svelte';

	export let vtuber: VtuberResponseData;
</script>

<div class="grid gap-2 sm:gap-4">
	<VideoCharts {vtuber} />
	<VideoList {vtuber} />
</div>
