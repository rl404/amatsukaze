<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import type { VtuberImagesResponseData } from './+page.server';

	export let data: VtuberImagesResponseData[];
</script>

<div
	class="grid h-screen grid-cols-3 gap-1 overflow-y-hidden p-1 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-10"
>
	{#each data as vtuber}
		<VtuberGrid
			id={vtuber.id}
			name={vtuber.name}
			image={vtuber.image}
			class="opacity-20 grayscale transition hover:opacity-100 hover:grayscale-0"
		/>
	{/each}
</div>
