<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { toTitleCase } from '$lib/utils';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	const chartData: Array<{ name: string; value: number }> = Object.entries(
		data.reduce((res: { [name: string]: number }, curr) => {
			curr.channels?.forEach((c) => {
				if (!res[c.type]) res[c.type] = 0;
				res[c.type]++;
			});
			return res;
		}, {})
	)
		.sort((a, b) => (a[1] < b[1] ? 1 : -1))
		.map((d) => ({
			name: toTitleCase(d[0]),
			value: d[1]
		}));

	const onClick = (d: any) => {
		const i = d.detail;
		const channelType = chartData[i].name.toUpperCase();
		window.open(`/vtubers?channel_types=${channelType}`, '_blank')?.focus();
	};
</script>

<DonutChart data={chartData} on:click={onClick} />
