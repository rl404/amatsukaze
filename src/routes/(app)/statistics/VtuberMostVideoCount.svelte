<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let modals: Array<SvelteComponent> = [];

	const chartData: Array<{ id: number; name: string; value: number }> = Object.values(
		data.reduce((res, vtuber) => {
			if (!res[vtuber.id]) res[vtuber.id] = { id: vtuber.id, name: vtuber.name, count: 0 };
			vtuber.channels.forEach((c) => {
				res[vtuber.id].count += c.videos.length;
			});
			return res;
		}, {} as { [id: number]: { id: number; name: string; count: number } })
	)
		.sort((a, b) => (a.count < b.count ? 1 : -1))
		.slice(0, 10)
		.map((d) => ({
			id: d.id,
			name: d.name,
			value: d.count
		}));

	const onClick = (d: any) => {
		const i = d.detail;
		modals[i].toggleOpen();
	};
</script>

<BarChart data={chartData} horizontal on:click={onClick} />

{#each chartData as d, i}
	<VtuberModal id={d.id} title={d.name} bind:this={modals[i]} />
{/each}
