<script lang="ts">
	export let title = 'Home';
	export let description =
		'Visualize vtuber data from wikia to family tree, agency tree, and statistics.';
	export let image = 'https://amatsukaze.rl404.com/home.png';
</script>

<svelte:head>
	<title>{`${title} | Amatsukaze`}</title>
	<meta name="title" content="Amatsukaze" />
	<meta name="description" content={description} />
	<meta property="og:title" content="Amatsukaze" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Amatsukaze" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="robots" content="noindex, nofollow" />
	<meta httpEquiv="Content-Type" content="text/html charset=utf-8" />
</svelte:head>
