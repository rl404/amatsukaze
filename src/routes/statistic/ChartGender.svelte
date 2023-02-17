<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';

	export let data: Array<vtubersResponseData> = [];

	const MALE = 'Male';
	const FEMALE = 'Female';
	const OTHER = 'Other';

	const genderData = Object.entries(
		data.reduce(
			(res: { [gender: string]: number }, curr) => {
				if (curr.gender === '') return res;

				let g = OTHER;
				switch (curr.gender.toLowerCase()) {
					case MALE.toLowerCase():
						g = MALE;
						break;
					case FEMALE.toLowerCase():
						g = FEMALE;
						break;
				}

				if (!res[g]) res[g] = 0;
				res[g]++;

				return res;
			},
			{ [MALE]: 0, [FEMALE]: 0, [OTHER]: 0 }
		)
	).sort((a, b) => (a[1] < b[1] ? 1 : -1));
</script>

<div class="text-center font-bold">Count by Gender</div>

<DonutChart
	class="p-2"
	data={genderData.map((d) => ({ group: d[0], value: d[1] }))}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: {
				[MALE]: 'rgb(202 138 4)',
				[FEMALE]: 'rgb(234 179 8)',
				[OTHER]: 'rgb(161 98 7)'
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
