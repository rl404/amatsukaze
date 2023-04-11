<script lang="ts">
	import ScrollTop from '$lib/components/ScrollTop.svelte';
	import Nav from './Nav.svelte';
</script>

<Nav />

<div class="bg-pink-dot-pattern dark:bg-purple-dot-pattern">
	<div class="container mx-auto max-w-5xl px-4 pt-8 pb-16">
		<slot />
	</div>
</div>

<ScrollTop />
