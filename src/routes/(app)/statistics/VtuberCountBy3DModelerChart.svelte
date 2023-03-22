<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.entries(
			data.reduce((res: { [name: string]: number }, curr) => {
				curr.character_3d_modelers?.forEach((c) => {
					if (!res[c]) res[c] = 0;
					res[c]++;
				});
				return res;
			}, {})
		)
			.sort((a, b) => (a[1] < b[1] ? 1 : -1))
			.slice(0, 10)
			.map((d) => ({
				name: d[0],
				value: d[1]
			}));
	});
</script>

<BarChart data={chartData} horizontal />
