<script>
	import PageTransition from '$lib/components/commons/PageTransition.svelte';
	import modeobserver from '$lib/utils/modeobserver';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(modeobserver);
</script>

<PageTransition />

<slot />
