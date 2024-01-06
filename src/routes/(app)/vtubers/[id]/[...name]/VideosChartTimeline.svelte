<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import {
		ChartBorderColors,
		ChartChannelColors,
		ChartTextColors,
		DayNames
	} from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import { intToDurationStr, relativeTime } from '$lib/utils/utils';
	import type {
		VtuberResponseDataChannel,
		VtuberResponseDataChannelVideo
	} from '../../../../api/vtubers/[id]/+server';

	export let data: VtuberResponseDataChannel[];

	const now = new Date();
	const videos = data.reduce(
		(res, c) => [...res, ...c.videos],
		[] as VtuberResponseDataChannelVideo[]
	);

	let chart: Chart;
	let chartStartWeek: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
	let chartEndWeek: Date = now;
	let currTheme: ThemeMode = ThemeMode.Dark;

	theme.subscribe((v) => (currTheme = v));

	type ChartDataType = {
		[type: string]: { id: string; day: string; startDate: number; endDate: number; url: string }[];
	};

	$: chartData = data.reduce((res, c) => {
		if (c.videos.length === 0) return res;
		if (!res[c.type]) res[c.type] = [];

		c.videos.forEach((v) => {
			if (!v.start_date || !v.end_date) return;
			res[c.type].push({
				id: v.id,
				day: DayNames[new Date(v.start_date).getDay()],
				startDate: new Date(v.start_date).getTime(),
				endDate: new Date(v.end_date).getTime(),
				url: v.url
			});
		});

		return res;
	}, {} as ChartDataType);

	export const showAll = () => {
		if (!chart) return;
		chart.updateOptions({
			xaxis: {
				min: undefined,
				max: undefined
			}
		});
	};

	export const currentWeek = () => {
		const today = new Date();
		chartStartWeek.setFullYear(today.getFullYear());
		chartStartWeek.setMonth(today.getMonth());
		chartStartWeek.setDate(today.getDate() - 7);
		chartEndWeek.setFullYear(today.getFullYear());
		chartEndWeek.setMonth(today.getMonth());
		chartEndWeek.setDate(today.getDate());
		updateChartMinMax();
	};

	export const previousWeek = () => {
		chartStartWeek.setDate(chartStartWeek.getDate() - 7);
		chartEndWeek.setDate(chartEndWeek.getDate() - 7);
		updateChartMinMax();
	};

	export const nextWeek = () => {
		chartStartWeek.setDate(chartStartWeek.getDate() + 7);
		chartEndWeek.setDate(chartEndWeek.getDate() + 7);
		updateChartMinMax();
	};

	export const updateChartMinMax = () => {
		if (!chart) return;
		chart.updateOptions({
			xaxis: {
				min: chartStartWeek.getTime(),
				max: chartEndWeek.getTime()
			}
		});
	};
</script>

<Chart
	bind:this={chart}
	options={{
		chart: {
			height: '100%',
			type: 'rangeBar',
			toolbar: { show: false },
			events: {
				dataPointSelection: (_, __, cfg) => {
					const d = Object.entries(chartData)[cfg.seriesIndex][1][cfg.dataPointIndex];
					if (d) window.open(d.url, '_blank')?.focus();
				}
			}
		},
		series: Object.entries(chartData).map((d) => ({
			name: d[0],
			color: ChartChannelColors[currTheme][d[0]],
			data: d[1].map((a) => ({
				x: a.day,
				y: [a.startDate, a.endDate]
			}))
		})),
		plotOptions: { bar: { horizontal: true } },
		grid: { borderColor: ChartBorderColors[currTheme] },
		labels: DayNames,
		xaxis: {
			type: 'datetime',
			labels: { style: { colors: ChartTextColors[currTheme] } },
			min: chartStartWeek.getTime(),
			max: now.getTime(),
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
			x: { format: 'dd MMM yyyy HH:mm' },
			custom: (opt) => {
				const d = Object.entries(chartData)[opt.seriesIndex][1][opt.dataPointIndex];
				if (!d) return '';

				const v = videos.find((v) => v.id === d.id);
				if (!v) return '';

				return `
				<div class="w-52 h-auto p-2">
					<div class="flex flex-col gap-1">
						<div class="relative bg-card dark:bg-card-dark rounded">
							<span class="absolute right-1 bottom-1 px-1 text-xs text-white bg-black rounded">${intToDurationStr(
								(d.endDate - d.startDate) / 1000
							)}</span>
							<img src="${
								v.image && `/api/image/${v.image}`
							}" class="aspect-video h-full w-full object-cover object-top rounded"/>
						</div>
						<div class="text-sm line-clamp-2 whitespace-normal">
							${v.title}
						</div>
						<div class="text-sm">
							<span class="opacity-50">${!v.start_date ? '' : relativeTime(new Date(v.start_date))}</span>
						</div>
					</div>
				</div>`;
			}
		},
		legend: { labels: { colors: ChartTextColors[currTheme] } }
	}}
/>
