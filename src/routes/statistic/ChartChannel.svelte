<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const colors = [
		'rgb(234 179 8)',
		'rgb(202 138 4)',
		'rgb(161 98 7)',
		'rgb(133 77 14)',
		'rgb(113 63 18)'
	];

	const channelData = Object.entries(
		data.reduce((res: { [channel: string]: number }, curr) => {
			curr.channels?.forEach((c) => {
				if (!res[c.type]) res[c.type] = 0;
				res[c.type]++;
			});
			return res;
		}, {})
	).sort((a, b) => (a[1] < b[1] ? 1 : -1));
</script>

<div class="text-center font-bold">Count by Channel</div>

<DonutChart
	class="p-2"
	data={channelData.map((d) => ({ group: d[0], value: d[1] }))}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: channelData.reduce((res, curr, i) => ({ ...res, [curr[0]]: colors[i] }), {})
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
