<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { navigating } from '$app/state';
	import { Progressbar } from 'flowbite-svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	// progress bar value
	const p = new Tween(0, {
		duration: 200,
		easing: cubicOut
	});

	let isVisible = false;

	function increase() {
		if (p.current >= 0 && p.current < 0.2) {
			p.set(p.current + 0.04);
		} else if (p.current >= 0.2 && p.current < 0.5) {
			p.set(p.current + 0.02);
		} else if (p.current >= 0.5 && p.current < 0.8) {
			p.set(p.current + 0.002);
		} else if (p.current >= 0.8 && p.current < 0.99) {
			p.set(p.current + 0.0005);
		} else {
			p.set(0);
		}

		if (navigating) {
			const rand = Math.round(Math.random() * (300 - 50)) + 50;
			setTimeout(function () {
				increase();
			}, rand);
		}
	}

	beforeNavigate(() => {
		increase();
		isVisible = true;
	});

	afterNavigate(() => {
		p.set(p.current + 0.3);
		setTimeout(function () {
			p.set(1);
			setTimeout(function () {
				isVisible = false;
				p.set(0);
			}, 100);
		}, 100);
	});
</script>

{#if p.current > 0 && p.current < 1 && isVisible}
	<div transition:fade class="absolute top-0 left-0 z-50 h-2 w-full">
		<Progressbar progress={p.current * 100} size="h-1" />
	</div>
{/if}
