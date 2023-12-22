<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import { ChartBorderColors, ChartColors, ChartTextColors } from '$lib/utils/const';
	import { ThemeMode, theme } from '$lib/utils/theme';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let data: VtuberResponseData[];

	let currTheme: ThemeMode = ThemeMode.Dark;
	let chartColors: string[] = [
		ChartColors.debut[0],
		ChartColors.retired[0],
		ChartColors[currTheme][0]
	];

	theme.subscribe((v) => (currTheme = v));

	type ChartDataType = { [date: string]: { debut: number; retired: number; total: number } };

	let chartData: ChartDataType = {};
	let minDate: Date = new Date();
	let maxDate: Date = new Date();

	$: data, setChartData();

	const setChartData = () => {
		data.forEach((vtuber) => {
			if (vtuber.debut_date && new Date(vtuber.debut_date)) {
				const debutDate = new Date(vtuber.debut_date);
				if (debutDate < minDate) minDate = debutDate;
				if (debutDate > maxDate) maxDate = debutDate;
			}

			if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
				const retiredDate = new Date(vtuber.retirement_date);
				if (retiredDate < minDate) minDate = retiredDate;
				if (retiredDate > maxDate) maxDate = retiredDate;
			}
		});

		minDate.setMonth(minDate.getMonth() - 1);
		maxDate.setMonth(maxDate.getMonth() + 1);

		while (minDate.toISOString().slice(0, 7) != maxDate.toISOString().slice(0, 7)) {
			const key = `${minDate.toISOString().slice(0, 7)}-01`;
			chartData[key] = { debut: 0, retired: 0, total: 0 };
			minDate.setMonth(minDate.getMonth() + 1);
		}

		data.forEach((vtuber) => {
			if (vtuber.debut_date && new Date(vtuber.debut_date)) {
				const debutDate = new Date(vtuber.debut_date).toISOString();
				const key = `${debutDate.slice(0, 7)}-01`;
				chartData[key].debut++;
				chartData[key].total++;
			}

			if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
				const retiredDate = new Date(vtuber.retirement_date).toISOString();
				const key = `${retiredDate.slice(0, 7)}-01`;
				chartData[key].retired++;
				chartData[key].total--;
			}
		});

		Object.entries(chartData).forEach((d, i) => {
			if (i === 0) return;
			const key = d[0];
			const prevKey = Object.entries(chartData)[i - 1][0];
			chartData[key].total += chartData[prevKey].total;
		});
	};
</script>

<div class="grid gap-2">
	<Border>
		<span class="pointer-events-none whitespace-nowrap px-4 font-bold">Member Count by Month</span>
	</Border>
	<div class="aspect-card">
		<Chart
			options={{
				chart: {
					height: '100%',
					type: 'line',
					toolbar: { show: false },
					zoom: { enabled: false },
					events: {
						click: (_, __, cfg) => {
							const id = Object.keys(chartData)[cfg.dataPointIndex];
							const el = document.getElementById(id);
							el?.scrollIntoView({ behavior: 'smooth' });
						}
					}
				},
				colors: chartColors,
				dataLabels: { enabled: false },
				fill: {
					type: ['solid', 'solid', 'gradient'],
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
					borderColor: ChartBorderColors[currTheme],
					strokeDashArray: 5,
					xaxis: { lines: { show: false } },
					yaxis: { lines: { show: true } }
				},
				series: [
					{
						name: 'Debut',
						type: 'column',
						data: Object.values(chartData).map((d) => d.debut)
					},
					{
						name: 'Retired',
						type: 'column',
						data: Object.values(chartData).map((d) => d.retired)
					},
					{
						name: 'Total Active',
						type: 'area',
						data: Object.values(chartData).map((d) => d.total)
					}
				],
				legend: { labels: { colors: ChartTextColors[currTheme] } },
				stroke: {
					curve: 'smooth',
					width: 2
				},
				tooltip: {
					theme: currTheme,
					intersect: false,
					shared: true,
					x: { format: 'MMM yyyy' },
					y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
				},
				xaxis: {
					type: 'datetime',
					categories: Object.keys(chartData),
					labels: { style: { colors: ChartTextColors[currTheme] } },
					axisBorder: { color: ChartBorderColors[currTheme] },
					axisTicks: { color: ChartBorderColors[currTheme] }
				},
				yaxis: [
					{
						seriesName: 'Debut',
						showAlways: true,
						labels: { style: { colors: ChartTextColors[currTheme] } },
						forceNiceScale: true,
						max: Math.max(
							...Object.values(chartData).map((d) => d.debut),
							...Object.values(chartData).map((d) => d.retired)
						),
						axisBorder: { show: true, color: ChartBorderColors[currTheme] },
						axisTicks: { show: true, color: ChartBorderColors[currTheme] }
					},
					{
						seriesName: 'Retired',
						show: false,
						labels: { style: { colors: ChartTextColors[currTheme] } },
						forceNiceScale: true,
						max: Math.max(
							...Object.values(chartData).map((d) => d.debut),
							...Object.values(chartData).map((d) => d.retired)
						),
						axisBorder: { show: true, color: ChartBorderColors[currTheme] },
						axisTicks: { show: true, color: ChartBorderColors[currTheme] }
					},
					{
						seriesName: 'Total Active',
						labels: { style: { colors: ChartTextColors[currTheme] } },
						forceNiceScale: true,
						opposite: true,
						axisBorder: { show: true, color: ChartBorderColors[currTheme] },
						axisTicks: { show: true, color: ChartBorderColors[currTheme] }
					}
				]
			}}
		/>
	</div>
</div>
