<script lang="ts">
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let avg: number = 0;

	onMount(() => {
		avg = Object.values(
			data.reduce((res, vtuber) => {
				if (!res[vtuber.id]) res[vtuber.id] = 0;
				vtuber.channels.forEach((c) => {
					res[vtuber.id] += c.videos.length;
				});
				return res;
			}, {} as { [id: number]: number })
		).reduce((avg, v, _, { length }) => avg + v / length, 0);
	});
</script>

<div class="text-center font-bold text-5xl">{parseFloat(avg.toFixed(1)).toLocaleString()}</div>
