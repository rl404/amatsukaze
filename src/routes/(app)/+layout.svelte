<script lang="ts">
	import Navbar from '$lib/components/commons/Navbar.svelte';
	import ScrollToTop from '$lib/components/commons/ScrollToTop.svelte';
	import Sidebar from '$lib/components/commons/Sidebar.svelte';

	let { children } = $props();

	let drawer: boolean = $state(false);
	let innerWidth: number = $state(0);

	const onResize = () => (drawer = innerWidth >= 1024 ? false : drawer);
</script>

<svelte:window bind:innerWidth on:resize={onResize} />

<header class="border-border sticky top-0 z-50 border-b bg-white dark:bg-gray-800">
	<Navbar bind:drawer />
</header>

<Sidebar bind:drawer />

<ScrollToTop />

<main class="p-2 transition-all sm:p-4 lg:ml-64">
	{@render children()}
</main>

<footer class="p-2 text-center text-sm transition-all sm:p-4 lg:ml-64">
	<p>All site material is property of their respective copyrights owners.</p>
	<p>Amatsukaze 2023 - {new Date().getFullYear()}.</p>
</footer>
