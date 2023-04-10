<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { chartBorderColors, chartColors, chartTextColors } from '$lib/components/charts/colors';
	import { getAxiosError, ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import { SvelteComponent, onMount } from 'svelte';
	import axios from 'axios';
	import type { vtuberDebutRetireCountMonthlyResponseData } from '../../api/statistics/vtubers/debut-retire-count-monthly/+server';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import VtuberCountMonthlyModal from './VtuberCountMonthlyModal.svelte';

	type chartData = vtuberDebutRetireCountMonthlyResponseData & {
		debut_total: number;
		retire_total: number;
		active_total: number;
	};

	let data: Array<chartData> = [];
	let loading: boolean = true;
	let error: string = '';

	let currTheme = ThemeMode.Dark;
	let colors = [chartColors.debut[0], chartColors.retired[0], chartColors.debut[1], chartColors.retired[1], chartColors[currTheme][0]];
	let textColor = chartTextColors[currTheme];
	let borderColor = chartBorderColors[currTheme];

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		textColor = chartTextColors[currTheme];
		borderColor = chartBorderColors[currTheme];
		colors[4] = chartColors[currTheme][0];
	});

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/debut-retire-count-monthly`)
			.then((resp) => {
				const rawData: Array<vtuberDebutRetireCountMonthlyResponseData> = resp.data.data;

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
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	});

	let modal: SvelteComponent;

	const openModal = (i: number) => {
		const d = data[i];
		if (!d) return;
		modal.toggleOpen(d.year, d.month);
	};
</script>

{#if loading}
	<div class="h-full flex justify-center items-center">
		<SpinnerIcon class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
	</div>
{:else if error !== ''}
	<div class="h-full flex justify-center items-center">
		<div class="text-center text-red-500">{error}</div>
	</div>
{:else}
	<Chart
		options={{
			chart: {
				height: 350,
				type: 'line',
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				},
				events: {
					click: (_, __, options) => {
						openModal(options.dataPointIndex);
					}
				}
			},
			colors: colors,
			dataLabels: {
				enabled: false
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
			grid: {
				borderColor: borderColor,
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
			legend: {
				labels: {
					colors: textColor
				}
			},
			stroke: {
				curve: 'smooth',
				width: 2
			},
			tooltip: {
				theme: currTheme,
				intersect: false,
				shared: true,
				x: {
					format: 'MMM yyyy'
				},
				y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
			},
			xaxis: {
				type: 'datetime',
				categories: data.map((d) => new Date(d.year, d.month, 1).toISOString().slice(0, 10)),
				labels: {
					style: { colors: textColor }
				},
				axisBorder: { color: borderColor },
				axisTicks: { color: borderColor }
			},
			yaxis: [
				{
					seriesName: 'Debut',
					showAlways: true,
					labels: {
						style: { colors: textColor }
					},
					forceNiceScale: true,
					max: Math.max(...data.map((d) => d.debut), ...data.map((d) => d.retire)),
					axisBorder: { show: true, color: borderColor },
					axisTicks: { show: true, color: borderColor }
				},
				{
					seriesName: 'Retire',
					show: false,
					labels: {
						style: { colors: textColor }
					},
					forceNiceScale: true,
					max: Math.max(...data.map((d) => d.debut), ...data.map((d) => d.retire)),
					axisBorder: { show: true, color: borderColor },
					axisTicks: { show: true, color: borderColor }
				},
				{
					seriesName: 'Debut Total',
					show: false,
					labels: {
						style: { colors: textColor }
					},
					max: Math.max(...data.map((d) => d.debut_total), ...data.map((d) => d.retire_total), ...data.map((d) => d.active_total)),
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: borderColor },
					axisTicks: { show: true, color: borderColor }
				},
				{
					seriesName: 'Retire Total',
					show: false,
					labels: {
						style: { colors: textColor }
					},
					max: Math.max(...data.map((d) => d.debut_total), ...data.map((d) => d.retire_total), ...data.map((d) => d.active_total)),
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: borderColor },
					axisTicks: { show: true, color: borderColor }
				},
				{
					seriesName: 'Total Active',
					showAlways: true,
					labels: {
						style: { colors: textColor }
					},
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: borderColor },
					axisTicks: { show: true, color: borderColor }
				}
			]
		}}
	/>

	<VtuberCountMonthlyModal bind:this={modal} />
{/if}
