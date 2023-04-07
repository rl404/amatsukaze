<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { chartBorderColors, chartColors, chartStrokeColors, chartTextColors } from '$lib/components/charts/colors';
	import { dayNames, ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

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

	let maxCount = 0;

	const chartData = data.reduce(
		(res, vtuber) => {
			vtuber.channels.forEach((c) => {
				c.videos.forEach((v) => {
					if (!v.start_date) return;
					const startDate = new Date(v.start_date);
					const day = startDate.getDay();
					const startHour = startDate.getHours();
					res[dayNames[day]][startHour]++;

					if (res[dayNames[day]][startHour] > maxCount) maxCount = res[dayNames[day]][startHour];
				});
			});
			return res;
		},
		dayNames.reduce((res, d) => ({ ...res, [d]: Array(24).fill(0) }), {} as { [day: string]: Array<number> })
	);
</script>

<Chart
	options={{
		chart: {
			height: 300,
			type: 'heatmap',
			toolbar: {
				show: false
			}
		},
		dataLabels: { enabled: false },
		legend: { show: false },
		grid: { show: false },
		series: Object.entries(chartData).map((d) => ({
			name: d[0],
			data: d[1]
		})),
		xaxis: {
			type: 'category',
			categories: Array(24)
				.fill(0)
				.map((_, i) => i),
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
					return `${dayNames[opt.seriesIndex]} at ${opt.dataPointIndex}:00 : ${v.toLocaleString()}`;
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
						to: (maxCount / colors.length) * (i + 1),
						color: c
					}))
				}
			}
		}
	}}
/>
