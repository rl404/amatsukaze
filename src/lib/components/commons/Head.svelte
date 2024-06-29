<script lang="ts">
	import Analytics from '$lib/components/commons/Analytics.svelte';

	export let title: string = 'Home';
	export let description: string = 'Visualize vtuber data from wikia to more modern website pages.';
	export let image: string = '/home.png';
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
	<meta http-equiv="Content-Type" content="text/html charset=utf-8" />
	<meta name="theme-color" content="#4f46e5" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Analytics />
