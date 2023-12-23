<script lang="ts">
	import { ChartBorderColors, ChartColors, ChartTextColors } from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import { createEventDispatcher } from 'svelte';
	import Chart from './Chart.svelte';

	const dispatch = createEventDispatcher<{ click: number; clickArea: number }>();

	type ChartData = {
		name: string;
		value: number;
	};

	export let data: ChartData[];
	export let seriesName: string = 'Count';
	export let horizontal: boolean = false;
	export let xaxisFormatter:
		| ((value: string, timestamp?: number, opts?: any) => string | string[])
		| undefined = undefined;
	export let tooltipYFormatter: (val: number, opts?: any) => string = (v) =>
		!v ? '0' : v.toLocaleString();

	let currTheme: ThemeMode = ThemeMode.Dark;

	theme.subscribe((v) => (currTheme = v));
</script>

<Chart
	options={{
		chart: {
			height: '100%',
			type: 'bar',
			toolbar: { show: false },
			events: {
				click: (_, __, options) => dispatch('clickArea', options.dataPointIndex),
				dataPointSelection: (_, __, options) => dispatch('click', options.dataPointIndex)
			}
		},
		colors: ChartColors[currTheme],
		dataLabels: { enabled: false },
		grid: {
			borderColor: ChartBorderColors[currTheme],
			strokeDashArray: 5,
			xaxis: { lines: { show: false } },
			yaxis: { lines: { show: true } }
		},
		plotOptions: {
			bar: {
				horizontal: horizontal
			}
		},
		series: [{ name: seriesName, data: data.map((d) => d.value) }],
		tooltip: {
			theme: currTheme,
			intersect: false,
			y: {
				formatter: tooltipYFormatter
			}
		},
		xaxis: {
			categories: data.map((d) => d.name),
			labels: {
				style: { colors: ChartTextColors[currTheme] },
				formatter: xaxisFormatter
			},
			axisBorder: { color: ChartBorderColors[currTheme] },
			axisTicks: { color: ChartBorderColors[currTheme] }
		},
		yaxis: {
			labels: {
				style: { colors: ChartTextColors[currTheme] },
				formatter: (v) => v.toLocaleString()
			},
			forceNiceScale: true,
			axisBorder: { show: true, color: ChartBorderColors[currTheme] },
			axisTicks: { show: true, color: ChartBorderColors[currTheme] }
		}
	}}
/>
