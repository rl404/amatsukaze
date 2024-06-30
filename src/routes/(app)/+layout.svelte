<script lang="ts">
	import Navbar from '$lib/components/commons/Navbar.svelte';
	import ScrollToTop from '$lib/components/commons/ScrollToTop.svelte';
	import Sidebar from '$lib/components/commons/Sidebar.svelte';

	let drawer: boolean = false;
</script>

<header class="sticky top-0 z-40 border-b border-border bg-white dark:bg-gray-800">
	<Navbar bind:drawer />
</header>

<Sidebar bind:drawer />

<ScrollToTop />

<main class="p-2 transition-all sm:p-4 lg:ml-64">
	<slot />
</main>

<footer class="p-2 text-center text-sm transition-all sm:p-4 lg:ml-64">
	<p>All site material is property of their respective copyrights owners.</p>
	<p>Amatsukaze 2023 - {new Date().getFullYear()}.</p>
</footer>
