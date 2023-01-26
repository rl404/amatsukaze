<script lang="ts">
	import type { PageData } from './$types';
	import HomeTitle from '$lib/HomeTitle.svelte';
	import HomeGrid from '$lib/HomeGrid.svelte';

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

	const vtubers = data.data.slice(0, 60);
</script>

<div class="relative overflow-hidden">
	<HomeGrid {vtubers} />
	<HomeTitle />
</div>
