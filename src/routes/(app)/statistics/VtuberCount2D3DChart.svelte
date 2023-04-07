<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: { both: number; has2D: number; has3D: number; none: number } = { both: 0, has2D: 0, has3D: 0, none: 0 };

	onMount(() => {
		chartData = data.reduce((res, curr) => {
			if (curr.has_2d && curr.has_3d) {
				res.both++;
			} else if (curr.has_2d) {
				res.has2D++;
			} else if (curr.has_3d) {
				res.has3D++;
			} else {
				res.none++;
			}
			return res;
		}, chartData);
	});

	const onClick = (d: any) => {
		const i = d.detail;
		switch (d.detail) {
			case 0:
				window.open(`/vtubers?has_2d=true&has_3d=true`, '_blank')?.focus();
				break;
			case 1:
				window.open(`/vtubers?has_2d=true&has_3d=false`, '_blank')?.focus();
				break;
			case 2:
				window.open(`/vtubers?has_2d=false&has_3d=true`, '_blank')?.focus();
				break;
			case 3:
				window.open(`/vtubers?has_2d=false&has_3d=false`, '_blank')?.focus();
				break;
		}
	};
</script>

<DonutChart
	data={[
		{ name: '2D & 3D', value: chartData.both },
		{ name: '2D Only', value: chartData.has2D },
		{ name: '3D Only', value: chartData.has3D },
		{ name: 'None', value: chartData.none }
	]}
	on:click={onClick}
/>
