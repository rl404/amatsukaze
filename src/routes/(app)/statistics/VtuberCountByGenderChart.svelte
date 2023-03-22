<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.entries(
			data.reduce((res: { [name: string]: number }, curr) => {
				if (curr.gender === '') return res;
				if (!res[curr.gender]) res[curr.gender] = 0;
				res[curr.gender]++;
				return res;
			}, {})
		)
			.sort((a, b) => (a[1] < b[1] ? 1 : -1))
			.map((d) => ({
				name: d[0],
				value: d[1]
			}));

		const topGenders = chartData.slice(0, 2).map((d) => d.name);

		const otherGenderCount = chartData.reduce((res, curr) => {
			if (!topGenders.includes(curr.name)) res += curr.value;
			return res;
		}, 0);

		chartData = chartData.slice(0, 2);
		chartData.push({ name: 'Other', value: otherGenderCount });
	});
</script>

<DonutChart data={chartData} />
