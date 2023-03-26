<script lang="ts">
	import { ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import { createEventDispatcher } from 'svelte';
	import Chart from './Chart.svelte';
	import { chartBorderColors, chartColors, chartTextColors, getChartColorsByCount } from './colors';

	const dispatch = createEventDispatcher<{ click: number }>();

	export let data: Array<{
		name: string;
		value: number;
	}>;

	let currTheme = ThemeMode.Dark;
	let colors = chartColors[currTheme];
	let textColor = chartTextColors[currTheme];
	let borderColor = chartBorderColors[currTheme];

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		colors = getChartColorsByCount(data.length, currTheme);
		textColor = chartTextColors[currTheme];
		borderColor = chartBorderColors[currTheme];
	});

	$: data, (colors = getChartColorsByCount(data.length, currTheme));
</script>

<Chart
	options={{
		chart: {
			height: 350,
			type: 'donut',
			events: {
				dataPointSelection: (_, __, options) => {
					dispatch('click', options.dataPointIndex);
				}
			}
		},
		colors: colors,
		series: data.map((d) => d.value),
		labels: data.map((d) => d.name),
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							color: textColor
						},
						value: {
							color: textColor,
							formatter: (v) => parseInt(v).toLocaleString()
						},
						total: {
							show: true,
							color: textColor,
							formatter: (_) => {
								return data.reduce((acc, curr) => (acc += curr.value), 0).toLocaleString();
							}
						}
					}
				}
			}
		},
		legend: {
			labels: {
				colors: textColor
			}
		},
		tooltip: {
			enabled: false
		},
		stroke: {
			width: 1,
			colors: [borderColor]
		}
	}}
/>
