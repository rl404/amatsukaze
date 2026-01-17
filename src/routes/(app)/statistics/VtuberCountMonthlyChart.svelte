<script lang="ts">
	import {
		ChartBorderColors,
		ChartColors,
		ChartDebutColors,
		ChartRetiredColors,
		ChartTextColors
	} from '$lib/const';
	import { getAxiosError } from '$lib/utils/api';
	import { DarkTheme } from '$lib/utils/theme';
	import { autoCeil } from '$lib/utils/utils';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { VtuberDebutRetireCountMonthlyResponseData } from '../../api/statistics/vtubers/debut-retire-count-monthly/+server';
	import VtuberCountMonthlyModal from './VtuberCountMonthlyModal.svelte';

	type ChartData = VtuberDebutRetireCountMonthlyResponseData & {
		debut_total: number;
		retire_total: number;
		active_total: number;
	};

	let data: ChartData[] = [];
	let maxData: number = 0;
	let maxTotal: number = 0;
	let loading: boolean = true;
	let error: string = '';
	let open: boolean = false;
	let modalYear: number = 0;
	let modalMonth: number = 0;
	let darkTheme: boolean = false;

	DarkTheme.subscribe((v) => (darkTheme = v));

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/debut-retire-count-monthly`)
			.then((resp) => {
				const rawData: VtuberDebutRetireCountMonthlyResponseData[] = resp.data.data;

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

				maxData = autoCeil(
					Math.max(...tmpData.map((d) => d.debut), ...tmpData.map((d) => d.retire))
				);

				maxTotal = autoCeil(
					Math.max(
						...tmpData.map((d) => d.debut_total),
						...tmpData.map((d) => d.retire_total),
						...tmpData.map((d) => d.active_total)
					)
				);

				data = [...tmpData];
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div class="flex size-full items-center justify-center">
		<Spinner class="dark:text-gray-400" />
	</div>
{:else if error !== ''}
	<div class="flex size-full items-center justify-center text-red-500">{error}</div>
{:else}
	{#key darkTheme}
		<Chart
			options={{
				chart: {
					height: '100%',
					type: 'line',
					toolbar: { show: false },
					zoom: { enabled: false },
					events: {
						click: (_, __, options) => {
							const d = data[options.dataPointIndex];
							if (!d) return;
							modalMonth = d.month;
							modalYear = d.year;
							open = true;
						}
					}
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
				xaxis: {
					type: 'datetime',
					categories: data.map((d) => new Date(d.year, d.month, 1).toISOString().slice(0, 10)),
					labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
					axisBorder: { color: ChartBorderColors[darkTheme.toString()] },
					axisTicks: { color: ChartBorderColors[darkTheme.toString()] }
				},
				yaxis: [
					{
						seriesName: 'Debut',
						showAlways: true,
						labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
						max: maxData,
						min: 0,
						axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
						axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
					},
					{
						seriesName: 'Retire',
						show: false,
						labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
						max: maxData,
						min: 0,
						axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
						axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
					},
					{
						seriesName: 'Debut Total',
						show: false,
						labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
						max: maxTotal,
						min: 0,
						opposite: true,
						axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
						axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
					},
					{
						seriesName: 'Retire Total',
						show: false,
						labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
						max: maxTotal,
						min: 0,
						opposite: true,
						axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
						axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
					},
					{
						seriesName: 'Total Active',
						showAlways: true,
						labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
						max: maxTotal,
						min: 0,
						opposite: true,
						axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
						axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
					}
				],
				colors: [
					ChartDebutColors[0],
					ChartRetiredColors[0],
					ChartDebutColors[1],
					ChartRetiredColors[1],
					ChartColors[darkTheme.toString()][0]
				],
				dataLabels: { enabled: false },
				legend: { labels: { colors: ChartTextColors[darkTheme.toString()] } },
				grid: {
					borderColor: ChartBorderColors[darkTheme.toString()],
					strokeDashArray: 5,
					xaxis: { lines: { show: true } },
					yaxis: { lines: { show: true } }
				},
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
	<VtuberCountMonthlyModal bind:open bind:month={modalMonth} bind:year={modalYear} />
{/if}
