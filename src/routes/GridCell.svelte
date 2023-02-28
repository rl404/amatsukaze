<script lang="ts">
	import VtuberModal from '$lib/components/VtuberModal.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtuberImagesResponseData } from './+page.server';

	export let data: vtuberImagesResponseData;

	let modal: SvelteComponent;
</script>

<div>
	<div
		style="background-image:url(/api/wikia/image/{data.image.split('?')[0]}?width=200)"
		class="transition relative h-full w-full bg-no-repeat bg-cover bg-top bg-white dark:bg-neutral-900 grayscale hover:grayscale-0 active:grayscale-0 opacity-20 hover:opacity-100 active:opacity-100 rounded hover:outline active:outline hover:outline-pink-500 active:outline-pink-500 dark:hover:outline-indigo-600 dark:active:outline-indigo-600 hover:drop-shadow-lg active:drop-shadow-lg cursor-pointer"
		on:click={() => modal.toggleOpen()}
	>
		<div class="transition absolute w-full h-full top-0 opacity-0 hover:opacity-100 active:opacity-100">
			<div
				class="absolute bottom-0 w-full font-bold text-white text-center bg-pink-500 dark:bg-indigo-600 p-0.5 text-ellipsis whitespace-nowrap overflow-hidden pointer-events-none"
			>
				{data.name}
			</div>
		</div>
	</div>
	<div class="pb-[100%]" />

	<VtuberModal id={data.id} title={data.name} bind:this={modal} />
</div>
