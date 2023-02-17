<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const statusData = data.reduce(
		(res, curr) => {
			if (curr.retirement_date) {
				res.retired++;
			} else {
				res.active++;
			}
			return res;
		},
		{ active: 0, retired: 0 }
	);
</script>

<div class="text-center font-bold">Count by Status</div>

<DonutChart
	class="p-2"
	data={[
		{
			group: 'Active',
			value: statusData.active
		},
		{
			group: 'Retired',
			value: statusData.retired
		}
	]}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: {
				Active: '#eab308',
				Retired: '#713e12'
			}
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
