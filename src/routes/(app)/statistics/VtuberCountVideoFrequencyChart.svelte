<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import {
		ChartBorderColors,
		ChartColors,
		ChartStrokeColors,
		ChartTextColors,
		DayNames
	} from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import axios from 'axios';
	import { onMount } from 'svelte';

	type ChartData = { [day: string]: number[] };

	let data: ChartData = DayNames.reduce((res, d) => ({ ...res, [d]: Array(24).fill(0) }), {});
	let maxCount: number = 0;
	let loading: boolean = true;
	let error: string = '';
	let currTheme: ThemeMode = ThemeMode.Dark;
	let chartColors: string[] = [...ChartColors[currTheme]].reverse();

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		chartColors = [...ChartColors[currTheme]].reverse();
	});

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/video-count-by-date?hourly=true&daily=true`)
			.then((resp) => {
				resp.data.data.forEach((d: { day: number; hour: number; count: number }) => {
					data[DayNames[d.day - 1]][d.hour] = d.count;
					if (d.count > maxCount) maxCount = d.count;
				});
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<Chart
		options={{
			chart: {
				height: '100%',
				type: 'heatmap',
				toolbar: { show: false }
			},
			dataLabels: { enabled: false },
			legend: { show: false },
			grid: { show: false },
			series: Object.entries(data).map((d) => ({
				name: d[0],
				data: d[1]
			})),
			xaxis: {
				type: 'category',
				categories: Array(24)
					.fill(0)
					.map((_, i) => i),
				labels: { style: { colors: ChartTextColors[currTheme] } },
				axisBorder: { show: true, color: ChartBorderColors[currTheme] },
				axisTicks: { show: true, color: ChartBorderColors[currTheme] }
			},
			yaxis: {
				labels: { style: { colors: ChartTextColors[currTheme] } },
				axisBorder: { show: true, color: ChartBorderColors[currTheme] },
				axisTicks: { show: true, color: ChartBorderColors[currTheme] }
			},
			tooltip: {
				theme: currTheme,
				y: {
					title: { formatter: () => '' },
					formatter: (v, opt) =>
						`${DayNames[opt.seriesIndex]} at ${opt.dataPointIndex}:00 : ${v.toLocaleString()}`
				}
			},
			stroke: { colors: [ChartStrokeColors[currTheme]] },
			plotOptions: {
				heatmap: {
					radius: 5,
					enableShades: false,
					useFillColorAsStroke: false,
					colorScale: {
						ranges: chartColors.map((c, i) => ({
							from: (maxCount / chartColors.length) * i,
							to: Math.ceil(maxCount / chartColors.length) * (i + 1),
							color: c
						}))
					}
				}
			}
		}}
	/>
{/if}
