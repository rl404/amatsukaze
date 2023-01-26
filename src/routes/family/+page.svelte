<script lang="ts">
	import FamilyGraph from '$lib/FamilyGraph.svelte';
	import FamilyGraphTop from '$lib/FamilyGraphTop.svelte';

	import type { PageData } from './$types';
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

<div class="w-screen h-screen" id="family-graph">
	<FamilyGraph data={data.data} {searchQuery} {searchResultIndex} />
	<FamilyGraphTop
		{searchQuery}
		on:reset={resetSearch}
		on:change={(e) => changeSearch(e.detail.search)}
		on:next={nextSearchResult}
	/>
</div>

<style>
	#family-graph {
		background-image: radial-gradient(#eab308 0.5px, white 0.5px);
		background-size: 15px 15px;
	}
</style>
