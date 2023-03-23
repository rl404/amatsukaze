<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.entries(
			data.reduce((res: { [name: string]: number }, curr) => {
				curr.agencies?.forEach((a) => {
					if (!res[a.name]) res[a.name] = 0;
					res[a.name]++;
				});
				return res;
			}, {})
		)
			.sort((a, b) => (a[1] < b[1] ? 1 : -1))
			.slice(0, 10)
			.map((d) => ({
				name: d[0],
				value: d[1]
			}));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		const agency = Object.values(chartData)[i];
		window.open(`/vtubers?agency=${agency.name}`, '_blank')?.focus();
	};
</script>

<BarChart data={chartData} horizontal on:click={onClick} />
