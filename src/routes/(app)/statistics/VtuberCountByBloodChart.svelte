<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ name: string; value: number }> = Object.entries(
		data.reduce((res: { [blood: string]: number }, curr) => {
			if (curr.blood_type === '') return res;
			if (!res[curr.blood_type]) res[curr.blood_type] = 0;
			res[curr.blood_type]++;
			return res;
		}, {})
	)
		.sort((a, b) => (a[1] < b[1] ? 1 : -1))
		.map((d) => ({
			name: d[0],
			value: d[1]
		}));

	const topBloodTypes = chartData.slice(0, 5).map((d) => d.name);

	const otherBloodTypeCount = chartData.reduce((res, curr) => {
		if (!topBloodTypes.includes(curr.name)) res += curr.value;
		return res;
	}, 0);

	chartData = chartData.slice(0, 5);
	chartData.push({ name: 'Other', value: otherBloodTypeCount });

	const onClick = (d: any) => {
		const i = d.detail;
		const bloodType = chartData[i].name;
		if (bloodType !== 'Other') {
			window.open(`/vtubers?blood_types=${bloodType}`, '_blank')?.focus();
			return;
		}

		const excludedBloodType = chartData
			.filter((d) => d.name !== 'Other')
			.map((d) => '-' + d.name)
			.join(',');

		window.open(`/vtubers?blood_types=${excludedBloodType}`, '_blank')?.focus();
	};
</script>

<DonutChart data={chartData} on:click={onClick} />
