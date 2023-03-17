<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import { getTheme, ThemeMode } from '$lib/utils';
	import { theme } from '$lib/utils/store';
	import type { vtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let vtubers: Array<vtuberResponseData> = [];

	let data: { [date: string]: { debut: number; retired: number; total: number } } = {};

	const today = new Date();
	today.setDate(1);
	today.setMonth(today.getMonth() + 1);
	const minDate = vtubers[0].debut_date ? new Date(vtubers[0].debut_date) : new Date();
	minDate.setDate(1);

	while (minDate.toISOString().slice(0, 7) != today.toISOString().slice(0, 7)) {
		const key = `${minDate.toISOString().slice(0, 7)}-01`;
		data[key] = { debut: 0, retired: 0, total: 0 };
		minDate.setMonth(minDate.getMonth() + 1);
	}

	vtubers.forEach((vtuber) => {
		if (vtuber.debut_date && new Date(vtuber.debut_date)) {
			const debutDate = new Date(vtuber.debut_date).toISOString();
			const key = `${debutDate.slice(0, 7)}-01`;
			data[key].debut++;
			data[key].total++;
		}

		if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
			const retiredDate = new Date(vtuber.retirement_date).toISOString();
			const key = `${retiredDate.slice(0, 7)}-01`;
			data[key].retired++;
			data[key].total--;
		}
	});

	Object.entries(data).forEach((d, i) => {
		if (i === 0) return;
		const key = d[0];
		const prevKey = Object.entries(data)[i - 1][0];
		data[key].total += data[prevKey].total;
	});

	let chartTheme = getTheme();
	let chartColors = ['#22c55e', '#ef4444', '#4f46e5'];
	let chartTextColor = chartTheme === ThemeMode.Dark ? '#e5e5e5' : '#404040';
	let chartBorderColor = chartTheme === ThemeMode.Dark ? '#525252' : '#e5e7eb';

	theme.subscribe((v) => {
		chartTheme = v;
		if (v === ThemeMode.Dark) {
			chartTextColor = '#e5e5e5';
			chartBorderColor = '#525252';
			chartColors[2] = '#4f46e5';
		} else {
			chartTextColor = '#404040';
			chartBorderColor = '#e5e7eb';
			chartColors[2] = '#ec4899';
		}
	});
</script>

<div>
	<Border>
		<span class="px-4 font-bold whitespace-nowrap">Member Count by Month</span>
	</Border>
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
			colors: chartColors,
			dataLabels: {
				enabled: false
			},
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
				borderColor: chartBorderColor,
				strokeDashArray: 5,
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } }
			},
			series: [
				{
					name: 'Debut',
					type: 'column',
					data: Object.values(data).map((d) => d.debut)
				},
				{
					name: 'Retired',
					type: 'column',
					data: Object.values(data).map((d) => d.retired)
				},
				{
					name: 'Total Active',
					type: 'area',
					data: Object.values(data).map((d) => d.total)
				}
			],
			legend: {
				labels: {
					colors: chartTextColor
				}
			},
			stroke: {
				curve: 'smooth',
				width: 2
			},
			tooltip: {
				theme: chartTheme,
				intersect: false,
				shared: true,
				x: {
					format: 'MMM yyyy'
				},
				y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
			},
			xaxis: {
				type: 'datetime',
				categories: Object.keys(data),
				labels: {
					style: { colors: chartTextColor }
				},
				axisBorder: { color: chartBorderColor },
				axisTicks: { color: chartBorderColor }
			},
			yaxis: [
				{
					seriesName: 'Debut',
					showAlways: true,
					labels: {
						style: { colors: chartTextColor }
					},
					forceNiceScale: true,
					max: Math.max(...Object.values(data).map((d) => d.debut), ...Object.values(data).map((d) => d.retired)),
					axisBorder: { show: true, color: chartBorderColor },
					axisTicks: { show: true, color: chartBorderColor }
				},
				{
					seriesName: 'Retired',
					show: false,
					labels: {
						style: { colors: chartTextColor }
					},
					max: Math.max(...Object.values(data).map((d) => d.debut), ...Object.values(data).map((d) => d.retired)),
					axisBorder: { show: true, color: chartBorderColor },
					axisTicks: { show: true, color: chartBorderColor }
				},
				{
					seriesName: 'Total Active',
					labels: {
						style: { colors: chartTextColor }
					},
					forceNiceScale: true,
					opposite: true,
					axisBorder: { show: true, color: chartBorderColor },
					axisTicks: { show: true, color: chartBorderColor }
				}
			]
		}}
	/>
</div>
