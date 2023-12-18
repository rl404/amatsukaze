<script lang="ts">
	import { setTheme } from '$lib/utils/theme';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => setTheme());
</script>

<slot />

<style lang="postcss">
	:global(.rangeSlider) {
		@apply !bg-card;
	}

	:global(.dark .rangeSlider) {
		@apply !bg-card-dark;
	}

	:global(.rangeSlider > .rangeHandle) {
		@apply !h-4 !w-4;
	}

	:global(.rangeSlider > .rangeBar) {
		@apply !bg-pink-200;
	}

	:global(.dark .rangeSlider > .rangeBar) {
		@apply !bg-indigo-400;
	}

	:global(.rangeSlider.focus > .rangeBar),
	:global(.rangeSlider > .rangeHandle > .rangeNub),
	:global(.rangeSlider > .rangeHandle > .rangeFloat) {
		@apply !bg-primary;
	}

	:global(.dark .rangeSlider.focus > .rangeBar),
	:global(.dark .rangeSlider > .rangeHandle > .rangeNub),
	:global(.dark .rangeSlider > .rangeHandle > .rangeFloat) {
		@apply !bg-primary-dark;
	}

	:global(.rangeSlider > .rangeHandle:hover::before) {
		box-shadow: 0 0 0 8px theme(colors.primary) !important;
	}

	:global(.dark .rangeSlider > .rangeHandle:hover::before) {
		box-shadow: 0 0 0 8px theme(colors.primary-dark) !important;
	}

	:global(.rangeSlider > .rangeHandle.press::before),
	:global(.rangeSlider > .rangeHandle.press:hover::before) {
		box-shadow: 0 0 0 12px theme(colors.primary) !important;
	}

	:global(.dark .rangeSlider > .rangeHandle.press::before),
	:global(.dark .rangeSlider > .rangeHandle.press:hover::before) {
		box-shadow: 0 0 0 12px theme(colors.primary-dark) !important;
	}

	:global(.rangeSlider > .rangePips > .pip) {
		@apply !bg-border;
	}

	:global(.dark .rangeSlider > .rangePips > .pip) {
		@apply !bg-border-dark;
	}

	:global(.rangeSlider > .rangePips > .pip.selected),
	:global(.rangeSlider > .rangePips > .pip.in-range) {
		@apply !bg-primary;
	}

	:global(.dark .rangeSlider > .rangePips > .pip.selected),
	:global(.dark .rangeSlider > .rangePips > .pip.in-range) {
		@apply !bg-primary-dark;
	}
</style>
