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

	const onClick = (d: any) => {
		const i = d.detail;
		const zodiac = chartData[i].name;
		if (zodiac !== 'Other') {
			window.open(`/vtubers?zodiacs=${zodiac}`, '_blank')?.focus();
			return;
		}

		const excludedZodiac = chartData
			.filter((d) => d.name !== 'Other')
			.map((d) => '-' + d.name)
			.join(',');

		window.open(`/vtubers?zodiacs=${excludedZodiac}`, '_blank')?.focus();
	};
</script>

<DonutChart data={chartData} on:click={onClick} />
