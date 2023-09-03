<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ click: null }>();

	export { className as class };
	let className = '';
	export let style: string = '';

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

		return () => {
			observer.unobserve(element);
		};
	});
</script>

<div class={className} {style} bind:this={element} on:click={() => dispatch('click')}>
	{#if isVisible || done}
		<slot />
	{/if}
</div>
