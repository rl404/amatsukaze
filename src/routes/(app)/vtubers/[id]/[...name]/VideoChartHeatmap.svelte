<script lang="ts">
	import { ChartBorderColors, ChartColors, ChartTextColors, DayNames } from '$lib/const';
	import { DarkTheme } from '$lib/utils/theme';
	import { Chart } from 'flowbite-svelte';
	import type { VtuberHeatmap } from './utils';

	export let data: VtuberHeatmap[];

	let darkTheme: boolean = false;

	DarkTheme.subscribe((v) => (darkTheme = v));

	$: maxValue = Math.max(...data.map((d) => d.value).flat());
</script>

<Chart
	options={{
		chart: {
			type: 'heatmap',
			height: '100%',
			toolbar: { show: false }
		},
		series: data.map((d) => ({
			name: d.day,
			data: d.value
		})),
		xaxis: {
			type: 'category',
			categories: Array(24)
				.fill(0)
				.map((_, i) => i),
			labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
			axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
			axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
		},
		yaxis: {
			labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
			axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
			axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
		},
		dataLabels: { enabled: false },
		legend: { show: false },
		grid: { show: false },
		stroke: { show: false },
		tooltip: {
			theme: darkTheme ? 'dark' : 'light',
			y: {
				title: { formatter: () => '' },
				formatter: (v, opt) =>
					`${DayNames[opt.seriesIndex]} at ${opt.dataPointIndex}:00 : ${v.toLocaleString()}`
			}
		},
		plotOptions: {
			heatmap: {
				radius: 5,
				enableShades: false,
				useFillColorAsStroke: false,
				colorScale: {
					ranges: [...ChartColors[darkTheme.toString()]].reverse().map((c, i) => ({
						from: (maxValue / ChartColors[darkTheme.toString()].length) * i,
						to: Math.ceil(maxValue / ChartColors[darkTheme.toString()].length) * (i + 1),
						color: c
					}))
				}
			}
		}
	}}
/>
