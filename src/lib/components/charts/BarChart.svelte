<script lang="ts">
	import { ChartBorderColors, ChartColors, ChartTextColors } from '$lib/const';
	import { DarkTheme } from '$lib/utils/theme';
	import { Chart } from 'flowbite-svelte';

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
	export let onClickArea: (n: number) => void = () => {};

	let darkTheme: boolean = false;

	DarkTheme.subscribe((v) => (darkTheme = v));
</script>

{#key darkTheme}
	<Chart
		options={{
			chart: {
				type: 'bar',
				height: '100%',
				toolbar: { show: false },
				events: {
					click: (_, __, options) => onClickArea(options.dataPointIndex)
				}
			},
			series: [{ name: seriesName, data: data.map((d) => d.value) }],
			xaxis: {
				categories: data.map((d) => d.name),
				labels: {
					style: { colors: ChartTextColors[darkTheme.toString()] },
					formatter: xaxisFormatter
				},
				axisBorder: { color: ChartBorderColors[darkTheme.toString()] },
				axisTicks: { color: ChartBorderColors[darkTheme.toString()] }
			},
			yaxis: {
				labels: {
					style: { colors: ChartTextColors[darkTheme.toString()] },
					formatter: (v) => v.toLocaleString()
				},
				forceNiceScale: true,
				axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
				axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
			},
			colors: ChartColors[darkTheme.toString()],
			dataLabels: { enabled: false },
			grid: {
				borderColor: ChartBorderColors[darkTheme.toString()],
				strokeDashArray: 5,
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } }
			},
			plotOptions: {
				bar: { horizontal: horizontal }
			},
			tooltip: {
				theme: darkTheme ? 'dark' : 'light',
				intersect: false,
				y: { formatter: tooltipYFormatter }
			}
		}}
	/>
{/key}
