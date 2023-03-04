<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import VtuberModal from '$lib/components/VtuberModal.svelte';
	import Image from './Image.svelte';

	export let id: number;
	export let name: string;
	export let image: string;

	export let height: number;
	export { className as class };
	let className: string = '';
	export { className2 as class2 };
	let className2: string = '';

	let modal: SvelteComponent;
</script>

<div class={className}>
	<div
		class="{className2} aspect-square group bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:outline hover:outline-pink-500 dark:hover:outline-indigo-600 drop-shadow hover:drop-shadow-lg cursor-pointer"
		on:click={() => modal.toggleOpen()}
	>
		<Image
			src={image && `/api/wikia/image/${image.split('?')[0]}?height=${height}`}
			alt={name}
			class="h-full w-full object-cover object-top rounded-lg"
		/>
		<div
			class="absolute bottom-0 w-full font-bold text-white text-center opacity-0 group-hover:opacity-100 bg-pink-500 dark:bg-indigo-600 p-0.5 text-ellipsis whitespace-nowrap overflow-hidden pointer-events-none"
		>
			{name}
		</div>
	</div>
	<VtuberModal {id} title={name} bind:this={modal} />
</div>
