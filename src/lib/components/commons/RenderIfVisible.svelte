<script lang="ts">
	import { onMount } from 'svelte';

	export { className as class };

	let className: string = '';
	let done: boolean = false;
	let isVisible: boolean = false;
	let element: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				isVisible = entry.isIntersecting;
				done = done || isVisible;
			});
		});

		observer.observe(element);

		return () => observer.unobserve(element);
	});
</script>

<div class={className} bind:this={element}>
	{#if isVisible || done}
		<slot />
	{/if}
</div>
