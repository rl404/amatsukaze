<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: { inAgency: number; independent: number } = { inAgency: 0, independent: 0 };

	onMount(() => {
		data.forEach((vtuber) => {
			if (vtuber.agencies.length > 0) {
				chartData.inAgency++;
			} else {
				chartData.independent++;
			}
		});
	});
</script>

<DonutChart
	data={[
		{ name: 'Independent', value: chartData.independent },
		{ name: 'In Agency', value: chartData.inAgency }
	]}
/>
