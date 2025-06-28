<script lang="ts">
	import { onMount } from 'svelte';

	export let once: boolean = true;

	let isVisible: boolean = false;
	let done: boolean = false;
	let element: HTMLElement;

	$: show = once ? done : isVisible;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!once) {
					isVisible = entry.isIntersecting;
				} else {
					done = done || entry.isIntersecting;
					isVisible = isVisible || entry.isIntersecting;
					if (entry.isIntersecting) {
						observer.unobserve(element);
					}
				}
			});
		});

		observer.observe(element);

		return () => observer.unobserve(element);
	});
</script>

<div class={$$props.class} bind:this={element}>
	{#if show}
		<slot />
	{/if}
</div>
