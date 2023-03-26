<script lang="ts">
	import { getRandomInt } from '$lib/utils';
	import ImageIcon from '../icons/ImageIcon.svelte';

	let rows: Array<Array<number>> = new Array(10).fill([]).map(() => [getRandomInt(50, 100), getRandomInt(10, 100)]);
</script>

<div class="grid grid-cols-5 gap-4 animate-pulse">
	<div class="col-span-5 h-52">
		<div class="flex items-center justify-center h-full w-52 m-auto rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800">
			<ImageIcon class="w-1/4 text-neutral-300 dark:text-neutral-300" />
		</div>
	</div>
	<div class="col-span-5 border-t dark:border-neutral-600" />
	{#each rows as r, i}
		<div class="col-span-2 h-6 pt-1">
			<div id="r-{i}-1" class="h-4 rounded-full float-right bg-neutral-100 dark:bg-neutral-600" style="width:{r[0]}%" />
		</div>
		<div class="col-span-3 pt-1">
			<div id="r-{i}-2" class="h-4 rounded-full bg-neutral-100 dark:bg-neutral-600" style="width:{r[0]}%" />
		</div>
	{/each}
</div>
