<script>
	import { setTheme } from '$lib/utils';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		setTheme();
	});
</script>

<slot />
