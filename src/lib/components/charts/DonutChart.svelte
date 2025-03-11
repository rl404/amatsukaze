<script lang="ts">
	import { ChartBorderColors, ChartColors, ChartTextColors } from '$lib/const';
	import { DarkTheme } from '$lib/utils/theme';
	import { Chart } from 'flowbite-svelte';

	type ChartData = {
		name: string;
		value: number;
	};

	export let data: ChartData[];
	export let onClick: (n: number) => void = () => {};

	let darkTheme: boolean = false;

	DarkTheme.subscribe((v) => (darkTheme = v));

	const getChartColorsByCount = (n: number): string[] => {
		if (n === 0) return ChartColors[darkTheme.toString()];
		return Array(n)
			.fill('')
			.map((_, i) => {
				const j = Math.floor((ChartColors[darkTheme.toString()].length / n) * i);
				return ChartColors[darkTheme.toString()][j];
			});
	};
</script>

<Chart
	options={{
		chart: {
			type: 'donut',
			height: '100%',
			events: {
				dataPointSelection: (_, __, options) => onClick(options.dataPointIndex)
			}
		},
		series: data.map((d) => d.value),
		labels: data.map((d) => d.name),
		colors: getChartColorsByCount(data.length),
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: { color: ChartTextColors[darkTheme.toString()] },
						value: {
							color: ChartTextColors[darkTheme.toString()],
							formatter: (v) => parseInt(v).toLocaleString()
						},
						total: {
							show: true,
							color: ChartTextColors[darkTheme.toString()],
							formatter: (_) => data.reduce((acc, curr) => (acc += curr.value), 0).toLocaleString()
						}
					}
				}
			}
		},
		legend: { labels: { colors: ChartTextColors[darkTheme.toString()] } },
		tooltip: { enabled: false },
		stroke: {
			width: 1,
			colors: [ChartBorderColors[darkTheme.toString()]]
		}
	}}
/>
