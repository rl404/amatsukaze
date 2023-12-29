<script lang="ts">
	import ImageIcon from '$lib/components/icons/ImageIcon.svelte';
	import { onMount } from 'svelte';

	export let src: string;
	export let alt: string;
	export { className as class };

	let className: string = '';
	let loading: boolean = true;
	let error: boolean = false;

	onMount(() => {
		if (src === '') return;

		const img = new Image();
		img.src = src;

		img.onload = () => {
			loading = false;
		};

		img.onerror = () => {
			loading = false;
			error = true;
		};
	});
</script>

{#if src === '' || error}
	<div
		class="{className} subtitle pointer-events-none flex aspect-square items-center justify-center overflow-hidden p-1 text-center text-xs"
	>
		{alt}
	</div>
{:else if loading}
	<div class="{className} flex aspect-square animate-pulse items-center justify-center">
		<ImageIcon class="w-1/4" />
	</div>
{:else}
	<img itemprop="image" {src} {alt} class={className} />
{/if}
