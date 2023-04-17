<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { chartBorderColors, chartColors, chartStrokeColors, chartTextColors } from '$lib/components/charts/colors';
	import { getAxiosError, monthNames, ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let currTheme = ThemeMode.Dark;
	let colors = [...chartColors[currTheme]].reverse();
	let strokeColor = chartStrokeColors[currTheme];
	let textColor = chartTextColors[currTheme];
	let borderColor = chartBorderColors[currTheme];

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		colors = [...chartColors[currTheme]].reverse();
		strokeColor = chartStrokeColors[currTheme];
		textColor = chartTextColors[currTheme];
		borderColor = chartBorderColors[currTheme];
	});

	let data: { [month: string]: Array<number> } = monthNames.reduce((res, d) => ({ ...res, [d]: Array(31).fill(0) }), {});
	let maxCount: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/birthday-count`)
			.then((resp) => {
				resp.data.data.forEach((d: { month: number; day: number; count: number }) => {
					data[monthNames[d.month - 1]][d.day - 1] = d.count;
					if (d.count > maxCount) maxCount = d.count;
				});
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (x: number, y: number) => {
		window.open(`/vtubers?birthday_day=${x + 1}&start_birthday_month=${y + 1}&end_birthday_month=${y + 1}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<Chart
		options={{
			chart: {
				height: 400,
				type: 'heatmap',
				toolbar: {
					show: false
				},
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
				labels: {
					style: { colors: textColor }
				},
				axisBorder: { show: true, color: borderColor },
				axisTicks: { show: true, color: borderColor }
			},
			yaxis: {
				labels: {
					style: { colors: textColor }
				},
				axisBorder: { show: true, color: borderColor },
				axisTicks: { show: true, color: borderColor }
			},
			tooltip: {
				theme: currTheme,
				y: {
					title: {
						formatter: () => ''
					},
					formatter: (v, opt) => {
						return `${opt.dataPointIndex + 1} ${monthNames[opt.seriesIndex].slice(0, 3)}: ${v.toLocaleString()}`;
					}
				}
			},
			stroke: { colors: [strokeColor] },
			plotOptions: {
				heatmap: {
					radius: 5,
					enableShades: false,
					useFillColorAsStroke: false,
					colorScale: {
						ranges: colors.map((c, i) => ({
							from: (maxCount / colors.length) * i,
							to: Math.ceil(maxCount / colors.length) * (i + 1),
							color: c
						}))
					}
				}
			}
		}}
	/>
{/if}
