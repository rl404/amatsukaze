<script lang="ts">
	import { ChartBorderColors, ChartTextColors } from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import { createEventDispatcher } from 'svelte';
	import Chart from './Chart.svelte';
	import { getChartColorsByCount } from './colors';

	const dispatch = createEventDispatcher<{ click: number }>();

	type ChartData = {
		name: string;
		value: number;
	};

	export let data: ChartData[];

	let currTheme: ThemeMode = ThemeMode.Dark;

	theme.subscribe((v) => (currTheme = v));
</script>

<Chart
	options={{
		chart: {
			height: '100%',
			type: 'donut',
			events: {
				dataPointSelection: (_, __, options) => dispatch('click', options.dataPointIndex)
			}
		},
		colors: getChartColorsByCount(data.length, currTheme),
		series: data.map((d) => d.value),
		labels: data.map((d) => d.name),
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: { color: ChartTextColors[currTheme] },
						value: {
							color: ChartTextColors[currTheme],
							formatter: (v) => parseInt(v).toLocaleString()
						},
						total: {
							show: true,
							color: ChartTextColors[currTheme],
							formatter: (_) => data.reduce((acc, curr) => (acc += curr.value), 0).toLocaleString()
						}
					}
				}
			}
		},
		legend: { labels: { colors: ChartTextColors[currTheme] } },
		tooltip: { enabled: false },
		stroke: {
			width: 1,
			colors: [ChartBorderColors[currTheme]]
		}
	}}
/>
