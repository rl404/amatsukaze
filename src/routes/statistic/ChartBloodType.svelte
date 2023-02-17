<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const TOP_COUNT = 5;

	const colors = [
		'rgb(250 204 21)',
		'rgb(234 179 8)',
		'rgb(202 138 4)',
		'rgb(161 98 7)',
		'rgb(133 77 14)',
		'rgb(113 63 18)'
	];

	const bloodTypeData = Object.entries(
		data.reduce((res: { [blood: string]: number }, curr) => {
			if (curr.blood_type === '') return res;
			if (!res[curr.blood_type]) res[curr.blood_type] = 0;
			res[curr.blood_type]++;
			return res;
		}, {})
	).sort((a, b) => (a[1] < b[1] ? 1 : -1));

	const topBloodTypes = bloodTypeData.slice(0, TOP_COUNT).map((d) => d[0]);

	const otherBloodTypeCount = bloodTypeData.reduce((res, curr) => {
		if (!topBloodTypes.includes(curr[0])) res += curr[1];
		return res;
	}, 0);

	let topBloodTypeData = bloodTypeData.slice(0, TOP_COUNT);
	topBloodTypeData.push(['Other', otherBloodTypeCount]);
</script>

<div class="text-center font-bold">Count by Blood Type</div>

<DonutChart
	class="p-2"
	data={topBloodTypeData.map((d) => ({ group: d[0], value: d[1] }))}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: topBloodTypeData.reduce((res, curr, i) => ({ ...res, [curr[0]]: colors[i] }), {})
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
