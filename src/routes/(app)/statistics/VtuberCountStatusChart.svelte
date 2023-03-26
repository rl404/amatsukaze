<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: { active: number; retired: number } = { active: 0, retired: 0 };

	onMount(() => {
		chartData = data.reduce(
			(res: { active: number; retired: number }, curr) => {
				if (curr.retirement_date) {
					res.retired++;
				} else {
					res.active++;
				}
				return res;
			},
			{ active: 0, retired: 0 }
		);
	});

	const onClick = (d: any) => {
		const i = d.detail;
		switch (d.detail) {
			case 0:
				window.open(`/vtubers?exclude_retired=true`, '_blank')?.focus();
				break;
			case 1:
				window.open(`/vtubers?exclude_active=true`, '_blank')?.focus();
				break;
		}
	};
</script>

<DonutChart
	data={[
		{ name: 'Active', value: chartData.active },
		{ name: 'Retired', value: chartData.retired }
	]}
	on:click={onClick}
/>
