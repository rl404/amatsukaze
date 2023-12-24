<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { ChartBorderColors, ChartColors, ChartTextColors } from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { VtuberDebutRetireCountYearlyResponseData } from '../../api/statistics/vtubers/debut-retire-count-yearly/+server';

	type ChartData = VtuberDebutRetireCountYearlyResponseData & {
		debut_total: number;
		retire_total: number;
		active_total: number;
	};

	let data: ChartData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let currTheme: ThemeMode = ThemeMode.Dark;
	let chartColors: string[] = [
		ChartColors.debut[0],
		ChartColors.retired[0],
		ChartColors.debut[1],
		ChartColors.retired[1],
		ChartColors[currTheme][0]
	];

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		chartColors[4] = ChartColors[currTheme][0];
	});

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/debut-retire-count-yearly`)
			.then((resp) => {
				const rawData: VtuberDebutRetireCountYearlyResponseData[] = resp.data.data;

				let tmpData = rawData.map((d) => ({
					...d,
					debut_total: d.debut,
					retire_total: d.retire,
					active_total: d.debut - d.retire
				}));

				tmpData.forEach((_, i) => {
					if (i === 0) return;
					tmpData[i].debut_total += tmpData[i - 1].debut_total;
					tmpData[i].retire_total += tmpData[i - 1].retire_total;
					tmpData[i].active_total += tmpData[i - 1].active_total;
				});

				data = tmpData;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div class="flex h-full items-center justify-center">
		<Loading class="h-8 w-8" />
	</div>
{:else if error !== ''}
	<div class="flex h-full items-center justify-center">
		<div class="text-center text-red-500">{error}</div>
	</div>
{:else}
	<Chart
		options={{
			chart: {
				height: '100%',
				type: 'line',
				toolbar: { show: false },
				zoom: { enabled: false }
			},
			colors: chartColors,
			dataLabels: { enabled: false },
			fill: {
				type: ['solid', 'solid', 'gradient', 'gradient', 'gradient'],
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
				borderColor: ChartBorderColors[currTheme],
				strokeDashArray: 5,
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } }
			},
			series: [
				{
					name: 'Debut',
					type: 'column',
					data: data.map((d) => d.debut)
				},
				{
					name: 'Retire',
					type: 'column',
					data: data.map((d) => d.retire)
				},
				{
					name: 'Total Debut',
					type: 'area',
					data: data.map((d) => d.debut_total)
				},
				{
					name: 'Total Retire',
					type: 'area',
					data: data.map((d) => d.retire_total)
				},
				{
					name: 'Total Active',
					type: 'area',
					data: data.map((d) => d.active_total)
				}
			],
			legend: { labels: { colors: ChartTextColors[currTheme] } },
			stroke: {
				curve: 'smooth',
				width: 2
			},
			tooltip: {
				theme: currTheme,
				intersect: false,
				shared: true,
				x: { format: 'yyyy' },
				y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
			},
			xaxis: {
				type: 'datetime',
				categories: data.map((d) => new Date(d.year, 1, 1).toISOString().slice(0, 10)),
				labels: { style: { colors: ChartTextColors[currTheme] } },
				axisBorder: { color: ChartBorderColors[currTheme] },
				axisTicks: { color: ChartBorderColors[currTheme] }
			},
			yaxis: [
				{
					seriesName: 'Debut',
					showAlways: true,
					labels: { style: { colors: ChartTextColors[currTheme] } },
					forceNiceScale: true,
					max: Math.max(...data.map((d) => d.debut), ...data.map((d) => d.retire)),
					axisBorder: { show: true, color: ChartBorderColors[currTheme] },
					axisTicks: { show: true, color: ChartBorderColors[currTheme] }
				},
				{
					seriesName: 'Retire',
					show: false,
					labels: { style: { colors: ChartTextColors[currTheme] } },
					forceNiceScale: true,
					max: Math.max(...data.map((d) => d.debut), ...data.map((d) => d.retire)),
					axisBorder: { show: true, color: ChartBorderColors[currTheme] },
					axisTicks: { show: true, color: ChartBorderColors[currTheme] }
				},
				{
					seriesName: 'Debut Total',
					show: false,
					labels: { style: { colors: ChartTextColors[currTheme] } },
					max: Math.max(
						...data.map((d) => d.debut_total),
						...data.map((d) => d.retire_total),
						...data.map((d) => d.active_total)
					),
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: ChartBorderColors[currTheme] },
					axisTicks: { show: true, color: ChartBorderColors[currTheme] }
				},
				{
					seriesName: 'Retire Total',
					show: false,
					labels: { style: { colors: ChartTextColors[currTheme] } },
					max: Math.max(
						...data.map((d) => d.debut_total),
						...data.map((d) => d.retire_total),
						...data.map((d) => d.active_total)
					),
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: ChartBorderColors[currTheme] },
					axisTicks: { show: true, color: ChartBorderColors[currTheme] }
				},
				{
					seriesName: 'Total Active',
					showAlways: true,
					labels: { style: { colors: ChartTextColors[currTheme] } },
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: ChartBorderColors[currTheme] },
					axisTicks: { show: true, color: ChartBorderColors[currTheme] }
				}
			]
		}}
	/>
{/if}
