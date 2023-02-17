<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { HeatmapChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const birthdayData = data
		.reduce((res: Array<Array<number>>, curr) => {
			if (!curr.birthday) return res;
			if (!new Date(curr.birthday)) return res;

			const month = new Date(curr.birthday).getMonth();
			const day = new Date(curr.birthday).getDate();
			if (!res[month]) res[month] = Array(31).fill(0);
			res[month][day - 1]++;

			return res;
		}, [])
		.reduce((res: Array<{ month: string; day: string; value: number }>, curr, i) => {
			curr.forEach((c, j) => {
				res.push({
					month: months[i],
					day: (j + 1).toString(),
					value: c
				});
			});
			return res;
		}, []);
</script>

<div class="text-center font-bold">Count by Birthday Date</div>

<HeatmapChart
	class="p-2"
	data={birthdayData}
	options={{
		resizable: true,
		legend: {
			enabled: false
		},
		color: {
			gradient: {
				colors: [
					'white',
					'rgb(254 252 232)',
					'rgb(254 249 195)',
					'rgb(254 240 138)',
					'rgb(253 224 71)',
					'rgb(250 204 21)',
					'rgb(234 179 8)',
					'rgb(202 138 4)',
					'rgb(161 98 7)',
					'rgb(133 77 14)',
					'rgb(113 63 18)',
					'black'
				],
				enabled: true
			}
		},
		toolbar: {
			enabled: false
		},
		axes: {
			left: {
				mapsTo: 'day',
				scaleType: 'labels'
			},
			bottom: {
				mapsTo: 'month',
				scaleType: 'labels'
			}
		},
		height: '300px'
	}}
/>
