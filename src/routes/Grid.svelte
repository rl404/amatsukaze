<script lang="ts">
	import type { vtuberImagesResponseData } from './+page.server';
	import GridCell from './GridCell.svelte';

	export let data: Array<vtuberImagesResponseData>;
</script>

<div class="grid xl:grid-cols-10 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 gap-1 p-1 h-screen overflow-y-hidden">
	{#each data as vtuber}
		<GridCell data={vtuber} />
	{/each}
</div>
