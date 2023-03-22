<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.entries(
			data.reduce((res: { [name: string]: number }, curr) => {
				curr.channels?.forEach((c) => {
					if (!res[c.type]) res[c.type] = 0;
					res[c.type]++;
				});
				return res;
			}, {})
		)
			.sort((a, b) => (a[1] < b[1] ? 1 : -1))
			.map((d) => ({
				name: d[0],
				value: d[1]
			}));
	});
</script>

<DonutChart data={chartData} />
