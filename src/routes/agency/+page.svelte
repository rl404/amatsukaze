<script lang="ts">
	import Head from '$lib/component/Head.svelte';
	import type { PageData } from './$types';
	import Graph from './Graph.svelte';
	import Top from './Top.svelte';

	export let data: PageData;

	let searchQuery = '';
	let searchResultIndex = -1;

	const changeSearch = (s: string) => {
		searchQuery = s;
		searchResultIndex = -1;
	};

	const resetSearch = () => {
		searchQuery = '';
		searchResultIndex = -1;
	};

	const nextSearchResult = () => {
		searchResultIndex++;
	};
</script>

<Head title="Agency Tree" description="Visualize vtuber data from wikia to agency tree." />

<div class="w-screen h-screen" id="agency-graph">
	<Graph data={data.data} {searchQuery} {searchResultIndex} />
	<Top
		{searchQuery}
		on:reset={resetSearch}
		on:change={(e) => changeSearch(e.detail.search)}
		on:next={nextSearchResult}
	/>
</div>

<style>
	#agency-graph {
		background-image: radial-gradient(#eab308 0.5px, white 0.5px);
		background-size: 15px 15px;
	}
</style>
