<script lang="ts">
	import PageTransition from '$lib/components/commons/PageTransition.svelte';
	import modeObserver from '$lib/utils/modeObserver';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(modeObserver);
	injectSpeedInsights();
</script>

<PageTransition />

{@render children()}
