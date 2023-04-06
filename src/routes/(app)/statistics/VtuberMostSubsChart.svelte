<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { compactInt } from '$lib/utils';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let modals: Array<SvelteComponent> = [];

	let chartData: Array<{ id: number; name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.values(
			data.reduce((res, vtuber) => {
				if (!res[vtuber.id]) res[vtuber.id] = { id: vtuber.id, name: vtuber.name, count: 0 };
				res[vtuber.id].count = vtuber.channels.reduce((max, c) => (c.subscriber > max ? c.subscriber : max), 0);
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
	});

	const onClick = (d: any) => {
		const i = d.detail;
		modals[i].toggleOpen();
	};
</script>

<BarChart
	data={chartData}
	horizontal
	xaxisFormatter={(v) => compactInt(parseInt(v))}
	tooltipYFormatter={(v) => (!v ? '0' : compactInt(v))}
	on:click={onClick}
/>

{#each chartData as d, i}
	<VtuberModal id={d.id} title={d.name} bind:this={modals[i]} />
{/each}
