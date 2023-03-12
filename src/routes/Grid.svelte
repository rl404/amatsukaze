<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import type { vtuberImagesResponseData } from './+page.server';

	export let data: Array<vtuberImagesResponseData>;
</script>

<div class="grid xl:grid-cols-10 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 gap-1 p-1 h-screen overflow-y-hidden">
	{#each data as vtuber}
		<VtuberGrid
			class2="transition opacity-20 hover:opacity-100 grayscale hover:grayscale-0"
			id={vtuber.id}
			name={vtuber.name}
			image={vtuber.image}
			height={206}
		/>
	{/each}
</div>
