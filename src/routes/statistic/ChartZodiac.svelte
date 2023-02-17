<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const TOP_COUNT = 12;

	const colors = [
		'rgb(253 224 71)',
		'rgb(250 204 21)',
		'rgb(234 179 8)',
		'rgb(202 138 4)',
		'rgb(161 98 7)',
		'rgb(133 77 14)',
		'rgb(113 63 18)',
		'rgb(120 53 15)',
		'rgb(146 64 14)',
		'rgb(180 83 9)',
		'rgb(217 119 6)',
		'rgb(245 158 11)',
		'rgb(251 191 36)'
	];

	const zodiacData = Object.entries(
		data.reduce((res: { [zodiac: string]: number }, curr) => {
			if (curr.zodiac_sign === '') return res;
			if (!res[curr.zodiac_sign]) res[curr.zodiac_sign] = 0;
			res[curr.zodiac_sign]++;
			return res;
		}, {})
	).sort((a, b) => (a[1] < b[1] ? 1 : -1));

	const topZodiacs = zodiacData.slice(0, TOP_COUNT).map((d) => d[0]);

	const otherZodiacCount = zodiacData.reduce((res, curr) => {
		if (!topZodiacs.includes(curr[0])) res += curr[1];
		return res;
	}, 0);

	let topZodiacData = zodiacData.slice(0, TOP_COUNT);
	topZodiacData.push(['Other', otherZodiacCount]);
</script>

<div class="text-center font-bold">Count by Zodiac Sign</div>

<DonutChart
	class="p-2"
	data={topZodiacData.map((d) => ({ group: d[0], value: d[1] }))}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: topZodiacData.reduce((res, curr, i) => ({ ...res, [curr[0]]: colors[i] }), {})
		},
		toolbar: {
			enabled: false
		},
		donut: {
			center: {
				label: 'Count'
			},
			alignment: 'center'
		},
		height: '300px'
	}}
/>
