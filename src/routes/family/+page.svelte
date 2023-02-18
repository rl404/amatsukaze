<script lang="ts">
	import Graph from './Graph.svelte';
	import Top from './Top.svelte';
	import type { PageData } from './$types';
	import Head from '$lib/component/Head.svelte';

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

<Head title="Family Tree" description="Visualize vtuber data from wikia to family tree." />

<div class="w-screen h-screen">
	<Graph data={data.data} {searchQuery} {searchResultIndex} />
	<Top
		{searchQuery}
		on:reset={resetSearch}
		on:change={(e) => changeSearch(e.detail.search)}
		on:next={nextSearchResult}
	/>
</div>
