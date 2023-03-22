<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.entries(
			data.reduce((res: { [name: string]: number }, curr) => {
				if (curr.zodiac_sign === '') return res;
				if (!res[curr.zodiac_sign]) res[curr.zodiac_sign] = 0;
				res[curr.zodiac_sign]++;
				return res;
			}, {})
		)
			.sort((a, b) => (a[1] < b[1] ? 1 : -1))
			.map((d) => ({
				name: d[0],
				value: d[1]
			}));

		const topZodiacs = chartData.slice(0, 12).map((d) => d.name);

		const otherZodiacCount = chartData.reduce((res, curr) => {
			if (!topZodiacs.includes(curr.name)) res += curr.value;
			return res;
		}, 0);

		chartData = chartData.slice(0, 12);
		chartData.push({ name: 'Other', value: otherZodiacCount });
	});
</script>

<DonutChart data={chartData} />
