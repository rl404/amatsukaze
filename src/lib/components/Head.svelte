<script lang="ts">
	import Analytics from './Analytics.svelte';

	export let title = 'Home';
	export let description = 'Visualize vtuber data from wikia to family tree, agency tree, and statistics.';
	export let image = '/home.png';
</script>

<svelte:head>
	<title>{`${title} | Amatsukaze`}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Amatsukaze" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="robots" content="noindex, nofollow" />
	<meta http-equiv="Content-Type" content="text/html charset=utf-8" />
	<meta name="theme-color" content="#eab308" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Analytics />
