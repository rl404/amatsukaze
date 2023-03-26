<script lang="ts">
	import { onMount } from 'svelte';
	import ImageIcon from './icons/ImageIcon.svelte';

	export let src: string;
	export let alt: string;
	export { className as class };
	let className: string;

	let loading = true;
	let error = false;

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

{#if src === ''}
	<div
		class="aspect-square text-base text-center flex items-center justify-center text-neutral-300 dark:text-neutral-300 overflow-hidden {className}"
	>
		{alt}
	</div>
{:else if loading}
	<div class="animate-pulse aspect-square flex items-center justify-center {className}">
		<ImageIcon class="w-1/4 text-neutral-300 dark:text-neutral-300" />
	</div>
{:else if error}
	<div
		class="aspect-square text-base text-center flex items-center justify-center text-neutral-300 dark:text-neutral-300 overflow-hidden {className}"
	>
		{alt}
	</div>
{:else}
	<img {src} {alt} class={className} />
{/if}
