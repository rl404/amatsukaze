<script lang="ts">
	import {
		ChartBorderColors,
		ChartColors,
		ChartDebutColors,
		ChartRetiredColors,
		ChartTextColors
	} from '$lib/const';
	import type { VtuberLayout } from '$lib/types';
	import { DarkTheme } from '$lib/utils/theme';
	import { Chart } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import { getChartData, type AgencyMemberMonth } from './utils';

	export let vtubers: VtuberResponseData[];
	export let layout: VtuberLayout;

	let darkTheme: boolean = false;
	let chartData: AgencyMemberMonth[] = [];

	DarkTheme.subscribe((v) => (darkTheme = v));

	$: vtubers, (chartData = getChartData(vtubers));
</script>

{#key darkTheme}
	<Chart
		options={{
			chart: {
				type: 'line',
				height: '100%',
				toolbar: { show: false },
				zoom: { enabled: false },
				events: {
					click: (_, __, cfg) => {
						if (cfg.dataPointIndex < 0) return;
						layout = 'timeline';
						setTimeout(() => {
							const id = chartData[cfg.dataPointIndex].date;
							const el = document.getElementById(id);
							el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
						}, 500);
					}
				}
			},
			series: [
				{
					name: 'Debut',
					type: 'column',
					data: chartData.map((d) => d.debut)
				},
				{
					name: 'Retired',
					type: 'column',
					data: chartData.map((d) => d.retired)
				},
				{
					name: 'Total Active',
					type: 'area',
					data: chartData.map((d) => d.total)
				}
			],
			xaxis: {
				type: 'datetime',
				categories: chartData.map((d) => d.date),
				labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
				axisBorder: { color: ChartBorderColors[darkTheme.toString()] },
				axisTicks: { color: ChartBorderColors[darkTheme.toString()] }
			},
			yaxis: [
				{
					seriesName: 'Debut',
					showAlways: true,
					labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
					forceNiceScale: true,
					min: 0,
					max: Math.max(...chartData.map((d) => d.debut), ...chartData.map((d) => d.retired)),
					axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
					axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
				},
				{
					seriesName: 'Retired',
					show: false,
					labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
					forceNiceScale: true,
					min: 0,
					max: Math.max(...chartData.map((d) => d.debut), ...chartData.map((d) => d.retired)),
					axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
					axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
				},
				{
					seriesName: 'Total Active',
					labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
					axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
				}
			],
			dataLabels: { enabled: false },
			legend: { labels: { colors: ChartTextColors[darkTheme.toString()] } },
			colors: [ChartDebutColors[0], ChartRetiredColors[0], ChartColors[darkTheme.toString()][0]],
			fill: {
				type: ['solid', 'solid', 'gradient'],
				gradient: {
					type: 'vertical',
					shadeIntensity: 1,
					inverseColors: false,
					opacityFrom: 0.7,
					opacityTo: 0,
					stops: [20, 100]
				}
			},
			grid: {
				borderColor: ChartBorderColors[darkTheme.toString()],
				strokeDashArray: 5,
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } }
			},
			stroke: {
				curve: 'smooth',
				width: 2
			},
			tooltip: {
				theme: darkTheme ? 'dark' : 'light',
				intersect: false,
				shared: true,
				x: { format: 'MMM yyyy' },
				y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
			}
		}}
	/>
{/key}
