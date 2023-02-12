<script lang="ts">
	import type { PageData } from './$types';
	import Title from './Title.svelte';
	import Grid from './Grid.svelte';
	import Head from '$lib/component/Head.svelte';

	export let data: PageData;

	const shuffleArray = (array: Array<any>) => {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	shuffleArray(data.data);

	const vtubers = data.data;
</script>

<Head />

<div class="relative overflow-hidden">
	<Grid {vtubers} />
	<Title />
</div>
