<script lang="ts">
	import { ChartBorderColors, ChartColors, ChartTextColors, MonthNames } from '$lib/const';
	import { getAxiosError } from '$lib/utils/api';
	import { DarkTheme } from '$lib/utils/theme';
	import axios from 'axios';
	import { Chart, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	type ChartData = { [month: string]: number[] };

	let data: ChartData = MonthNames.reduce((res, d) => ({ ...res, [d]: Array(31).fill(0) }), {});
	let maxCount: number = 0;
	let loading: boolean = true;
	let error: string = '';
	let darkTheme: boolean = false;

	DarkTheme.subscribe((v) => (darkTheme = v));

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
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:else if error !== ''}
	<div class="flex h-full w-full items-center justify-center text-red-500">{error}</div>
{:else}
	<Chart
		options={{
			chart: {
				type: 'heatmap',
				height: '100%',
				toolbar: { show: false },
				events: {
					click: (_, __, options) => onClick(options.dataPointIndex, options.seriesIndex)
				}
			},
			series: Object.entries(data).map((d) => ({
				name: d[0],
				data: d[1]
			})),
			xaxis: {
				type: 'category',
				categories: Array(31)
					.fill(0)
					.map((_, i) => i + 1),
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
						`${opt.dataPointIndex + 1} ${MonthNames[opt.seriesIndex].slice(
							0,
							3
						)}: ${v.toLocaleString()}`
				}
			},
			plotOptions: {
				heatmap: {
					radius: 5,
					enableShades: false,
					useFillColorAsStroke: false,
					colorScale: {
						ranges: [...ChartColors[darkTheme.toString()]].reverse().map((c, i) => ({
							from: (maxCount / ChartColors[darkTheme.toString()].length) * i,
							to: Math.ceil(maxCount / ChartColors[darkTheme.toString()].length) * (i + 1),
							color: c
						}))
					}
				}
			}
		}}
	/>
{/if}
