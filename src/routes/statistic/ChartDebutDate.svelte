<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { BarChartGrouped } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const debutDateData = Object.entries(
		data.reduce((res: { [year: number]: { [name: string]: number } }, curr) => {
			if (curr.debut_date && new Date(curr.debut_date)) {
				const year = new Date(curr.debut_date).getFullYear();
				if (!res[year]) res[year] = { debut: 0, retire: 0 };
				res[year].debut++;
			}

			if (curr.retirement_date && new Date(curr.retirement_date)) {
				const year = new Date(curr.retirement_date).getFullYear();
				if (!res[year]) res[year] = { debut: 0, retire: 0 };
				res[year].retire++;
			}
			return res;
		}, {})
	).reduce((res: Array<{ year: string; type: string; value: number }>, curr) => {
		if (curr[0] === '0') return res;
		res.push(
			{
				year: curr[0],
				type: 'debut',
				value: curr[1].debut
			},
			{
				year: curr[0],
				type: 'retire',
				value: curr[1].retire
			}
		);
		return res;
	}, []);
</script>

<div class="text-center font-bold">Count by Debut & Retirement Year</div>

<BarChartGrouped
	class="p-2"
	data={debutDateData.map((a) => {
		return {
			year: a.year,
			group: a.type,
			value: a.value
		};
	})}
	options={{
		resizable: true,
		legend: {
			enabled: false
		},
		color: {
			pairing: {
				option: 2
			},
			scale: {
				debut: '#eab308',
				retire: '#713e12'
			}
		},
		toolbar: {
			enabled: false
		},
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				mapsTo: 'year',
				scaleType: 'labels'
			}
		},
		height: '300px'
	}}
/>
