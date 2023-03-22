<script lang="ts">
	import { ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import Chart from './Chart.svelte';
	import { chartBorderColors, chartColors, chartTextColors } from './colors';

	export let data: Array<{
		name: string;
		value: number;
	}>;
	export let seriesName: string = 'Count';
	export let horizontal: boolean = false;

	let currTheme = ThemeMode.Dark;
	let colors = chartColors[currTheme];
	let textColor = chartTextColors[currTheme];
	let borderColor = chartBorderColors[currTheme];

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		colors = chartColors[currTheme];
		textColor = chartTextColors[currTheme];
		borderColor = chartBorderColors[currTheme];
	});
</script>

<Chart
	options={{
		chart: {
			height: 350,
			type: 'bar',
			toolbar: {
				show: false
			}
		},
		colors: colors,
		dataLabels: {
			enabled: false
		},
		grid: {
			borderColor: borderColor,
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
				formatter: (v) => (!v ? '0' : v.toLocaleString())
			}
		},
		xaxis: {
			categories: data.map((d) => d.name),
			labels: {
				style: { colors: textColor }
			},
			axisBorder: { color: borderColor },
			axisTicks: { color: borderColor }
		},
		yaxis: {
			labels: {
				style: { colors: textColor },
				formatter: (v) => v.toLocaleString()
			},
			forceNiceScale: true,
			axisBorder: { show: true, color: borderColor },
			axisTicks: { show: true, color: borderColor }
		}
	}}
/>
