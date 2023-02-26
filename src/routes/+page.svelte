<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import type { vtuberImagesResponse } from './+page.server';
	import Grid from './Grid.svelte';
	import Title from './Title.svelte';

	export let data: vtuberImagesResponse;

	const shuffleArray = (array: Array<any>) => {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	shuffleArray(data.data);
</script>

<Head />

<div class="relative overflow-hidden">
	<Grid data={data.data} />
	<Title />
</div>
