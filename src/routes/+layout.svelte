<script lang="ts">
	import PageTransition from '$lib/components/commons/PageTransition.svelte';
	import modeObserver from '$lib/utils/modeObserver';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(modeObserver);
</script>

<PageTransition />

{@render children()}
