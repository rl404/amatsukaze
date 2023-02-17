<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { BarChartSimple } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const colors = [
		'rgb(254 252 232)',
		'rgb(254 249 195)',
		'rgb(254 240 138)',
		'rgb(253 224 71)',
		'rgb(250 204 21)',
		'rgb(234 179 8)',
		'rgb(202 138 4)',
		'rgb(161 98 7)',
		'rgb(133 77 14)',
		'rgb(113 63 18)'
	];

	const illustratorData = Object.entries(
		data.reduce((res: { [name: string]: number }, curr) => {
			curr.character_3d_modelers?.forEach((a) => {
				if (!res[a]) res[a] = 0;
				res[a]++;
			});
			return res;
		}, {})
	)
		.sort((a, b) => (a[1] < b[1] ? 1 : -1))
		.slice(0, 10)
		.sort((a, b) =>
			a[1] === b[1] ? (a[0].toLowerCase() < b[0].toLowerCase() ? 1 : -1) : a[1] > b[1] ? 1 : -1
		);
</script>

<div class="text-center font-bold">3D Modeler</div>

<BarChartSimple
	class="p-2"
	data={illustratorData.map((a) => {
		return {
			group: a[0],
			value: a[1]
		};
	})}
	options={{
		resizable: true,
		legend: {
			enabled: false
		},
		color: {
			scale: illustratorData.reduce((res, curr, i) => ({ ...res, [curr[0]]: colors[i] }), {})
		},
		toolbar: {
			enabled: false
		},
		axes: {
			left: {
				mapsTo: 'group',
				scaleType: 'labels'
			},
			bottom: {
				mapsTo: 'value'
			}
		},
		height: '300px'
	}}
/>
