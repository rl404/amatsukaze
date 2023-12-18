<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import {
		ChartBorderColors,
		ChartColors,
		ChartStrokeColors,
		ChartTextColors,
		DayNames
	} from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import type { VtuberResponseDataChannel } from '../../../../api/vtubers/[id]/+server';

	type ChartDataType = { [day: string]: number[] };

	export let data: VtuberResponseDataChannel[];

	let chart: Chart;
	let maxCount: number = 0;
	let currTheme: ThemeMode = ThemeMode.Dark;
	let chartColors: string[] = [...ChartColors[currTheme]].reverse();

	theme.subscribe((v) => {
		if (!v) return;
		currTheme = v;
		chartColors = [...ChartColors[currTheme]].reverse();
	});

	const chartData: ChartDataType = data.reduce(
		(res, c) => {
			c.videos.forEach((v) => {
				if (!v.start_date) return;
				const startDate = new Date(v.start_date);
				const day = startDate.getDay();
				const startHour = startDate.getHours();
				res[DayNames[day]][startHour]++;

				if (res[DayNames[day]][startHour] > maxCount) maxCount = res[DayNames[day]][startHour];
			});
			return res;
		},
		DayNames.reduce((res, d) => ({ ...res, [d]: Array(24).fill(0) }), {}) as ChartDataType
	);
</script>

<Chart
	bind:this={chart}
	options={{
		chart: {
			height: '100%',
			type: 'heatmap',
			toolbar: { show: false }
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
