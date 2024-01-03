<script lang="ts">
	import ScrollTop from '$lib/components/commons/ScrollTop.svelte';
	import Nav from './Nav.svelte';
</script>

<Nav />

<div class="container mx-auto max-w-5xl px-4 pb-16 pt-8">
	<slot />
</div>

<ScrollTop />
