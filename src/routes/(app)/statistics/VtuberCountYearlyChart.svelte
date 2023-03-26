<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { chartBorderColors, chartColors, chartTextColors } from '$lib/components/charts/colors';
	import { ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

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

	let chartData: {
		[year: string]: {
			debut: Array<vtuberResponseData>;
			retired: Array<vtuberResponseData>;
			debut_total: number;
			retired_total: number;
			active_total: number;
		};
	} = {};

	let minDate = new Date();
	let maxDate = new Date();

	onMount(() => {
		data.forEach((vtuber) => {
			if (vtuber.debut_date && new Date(vtuber.debut_date)) {
				const debutDate = new Date(vtuber.debut_date);
				if (debutDate.getFullYear() === 0) return;
				if (debutDate < minDate) minDate = debutDate;
				if (debutDate > maxDate) maxDate = debutDate;
			}

			if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
				const retiredDate = new Date(vtuber.retirement_date);
				if (retiredDate.getFullYear() === 0) return;
				if (retiredDate < minDate) minDate = retiredDate;
				if (retiredDate > maxDate) maxDate = retiredDate;
			}
		});

		minDate.setFullYear(minDate.getFullYear() - 1);
		maxDate.setFullYear(maxDate.getFullYear() + 1);

		while (minDate.toISOString().slice(0, 7) != maxDate.toISOString().slice(0, 7)) {
			const key = minDate.getFullYear();
			chartData[key] = { debut: [], retired: [], debut_total: 0, retired_total: 0, active_total: 0 };
			minDate.setMonth(minDate.getMonth() + 1);
		}

		data.forEach((vtuber) => {
			if (vtuber.debut_date && new Date(vtuber.debut_date)) {
				const debutDate = new Date(vtuber.debut_date);
				if (debutDate.getFullYear() === 0) return;
				const key = debutDate.getFullYear();
				chartData[key].debut.push(vtuber);
				chartData[key].debut_total++;
				chartData[key].active_total++;
			}

			if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
				const retiredDate = new Date(vtuber.retirement_date);
				if (retiredDate.getFullYear() === 0) return;
				const key = retiredDate.getFullYear();
				chartData[key].retired.push(vtuber);
				chartData[key].retired_total++;
				chartData[key].active_total--;
			}
		});

		Object.entries(chartData).forEach((d, i) => {
			if (i === 0) return;
			const key = d[0];
			const prevKey = Object.entries(chartData)[i - 1][0];
			chartData[key].debut_total += chartData[prevKey].debut_total;
			chartData[key].retired_total += chartData[prevKey].retired_total;
			chartData[key].active_total += chartData[prevKey].active_total;
		});
	});
</script>

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
				data: Object.values(chartData).map((d) => d.debut.length)
			},
			{
				name: 'Retired',
				type: 'column',
				data: Object.values(chartData).map((d) => d.retired.length)
			},
			{
				name: 'Total Debut',
				type: 'area',
				data: Object.values(chartData).map((d) => d.debut_total)
			},
			{
				name: 'Total Retired',
				type: 'area',
				data: Object.values(chartData).map((d) => d.retired_total)
			},
			{
				name: 'Total Active',
				type: 'area',
				data: Object.values(chartData).map((d) => d.active_total)
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
				format: 'yyyy'
			},
			y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
		},
		xaxis: {
			type: 'datetime',
			categories: Object.keys(chartData),
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
				max: Math.max(...Object.values(chartData).map((d) => d.debut.length), ...Object.values(chartData).map((d) => d.retired.length)),
				axisBorder: { show: true, color: borderColor },
				axisTicks: { show: true, color: borderColor }
			},
			{
				seriesName: 'Retired',
				show: false,
				labels: {
					style: { colors: textColor }
				},
				forceNiceScale: true,
				max: Math.max(...Object.values(chartData).map((d) => d.debut.length), ...Object.values(chartData).map((d) => d.retired.length)),
				axisBorder: { show: true, color: borderColor },
				axisTicks: { show: true, color: borderColor }
			},
			{
				seriesName: 'Debut Total',
				show: false,
				labels: {
					style: { colors: textColor }
				},
				max: Math.max(
					...Object.values(chartData).map((d) => d.debut_total),
					...Object.values(chartData).map((d) => d.retired_total),
					...Object.values(chartData).map((d) => d.active_total)
				),
				forceNiceScale: true,
				opposite: true,
				axisBorder: { show: true, color: borderColor },
				axisTicks: { show: true, color: borderColor }
			},
			{
				seriesName: 'Retired Total',
				show: false,
				labels: {
					style: { colors: textColor }
				},
				max: Math.max(
					...Object.values(chartData).map((d) => d.debut_total),
					...Object.values(chartData).map((d) => d.retired_total),
					...Object.values(chartData).map((d) => d.active_total)
				),
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
