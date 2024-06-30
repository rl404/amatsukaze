<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import { shuffleArray } from '$lib/utils/utils';
	import { onMount } from 'svelte';
	import type { VtuberImagesResponse } from './+page.server';
	import Grid from './Grid.svelte';
	import Schema from './Schema.svelte';
	import Title from './Title.svelte';

	export let data: VtuberImagesResponse;

	onMount(() => shuffleArray(data.data));
</script>

<Head />

<Schema />

<main class="relative h-screen w-screen overflow-hidden">
	<Grid data={data.data} />
	<Title />
</main>
