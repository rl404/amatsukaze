<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	const chartData: { inAgency: number; independent: number } = data.reduce(
		(res, vtuber) => {
			if (vtuber.agencies.length > 0) {
				res.inAgency++;
			} else {
				res.independent++;
			}
			return res;
		},
		{ inAgency: 0, independent: 0 }
	);

	const onClick = (d: any) => {
		const i = d.detail;
		switch (d.detail) {
			case 0:
				window.open(`/vtubers?in_agency=false`, '_blank')?.focus();
				break;
			case 1:
				window.open(`/vtubers?in_agency=true`, '_blank')?.focus();
				break;
		}
	};
</script>

<DonutChart
	data={[
		{ name: 'Independent', value: chartData.independent },
		{ name: 'In Agency', value: chartData.inAgency }
	]}
	on:click={onClick}
/>
