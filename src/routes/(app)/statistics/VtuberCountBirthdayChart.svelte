<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { chartBorderColors, chartColors, chartStrokeColors, chartTextColors } from '$lib/components/charts/colors';
	import { monthNames, ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import { onMount } from 'svelte';
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

	let chartData: { [month: string]: Array<number> } = {};

	onMount(() => {
		chartData = data.reduce(
			(res, vtuber) => {
				if (!vtuber.birthday || !new Date(vtuber.birthday)) return res;
				const birthday = new Date(vtuber.birthday);
				const m = monthNames[birthday.getMonth()].slice(0, 3);
				const d = birthday.getDate();
				res[m][d - 1]++;

				if (res[m][d - 1] > maxCount) maxCount = res[m][d - 1];

				return res;
			},
			monthNames.reduce((res, m) => ({ ...res, [m.slice(0, 3)]: Array(31).fill(0) }), chartData)
		);
	});

	const onClick = (x: number, y: number) => {
		window.open(`/vtubers?birthday_day=${x + 1}&start_birthday_month=${y + 1}&end_birthday_month=${y + 1}`, '_blank')?.focus();
	};
</script>

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
		series: Object.entries(chartData).map((d) => ({
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
						to: (maxCount / colors.length) * (i + 1),
						color: c
					}))
				}
			}
		}
	}}
/>
