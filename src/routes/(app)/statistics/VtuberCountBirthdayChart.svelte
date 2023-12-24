<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import {
		ChartBorderColors,
		ChartColors,
		ChartStrokeColors,
		ChartTextColors,
		MonthNames
	} from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import axios from 'axios';
	import { onMount } from 'svelte';

	type ChartData = { [month: string]: number[] };

	let data: ChartData = MonthNames.reduce((res, d) => ({ ...res, [d]: Array(31).fill(0) }), {});
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
			.get(`/api/statistics/vtubers/birthday-count`)
			.then((resp) => {
				resp.data.data.forEach((d: { month: number; day: number; count: number }) => {
					data[MonthNames[d.month - 1]][d.day - 1] = d.count;
					if (d.count > maxCount) maxCount = d.count;
				});
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (x: number, y: number) => {
		window
			.open(
				`/vtubers?birthday_day=${x + 1}&start_birthday_month=${y + 1}&end_birthday_month=${y + 1}`,
				'_blank'
			)
			?.focus();
	};
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
				toolbar: { show: false },
				events: {
					click: (_, __, options) => {
						onClick(options.dataPointIndex, options.seriesIndex);
					}
				}
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
				categories: Array(31)
					.fill(0)
					.map((_, i) => i + 1),
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
						`${opt.dataPointIndex + 1} ${MonthNames[opt.seriesIndex].slice(
							0,
							3
						)}: ${v.toLocaleString()}`
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
