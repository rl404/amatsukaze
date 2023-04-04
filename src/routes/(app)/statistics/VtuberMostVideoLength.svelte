<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { intToDurationStr } from '$lib/utils';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { vtuberResponseData, vtuberResponseDataChannelVideo } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let chartData: Array<{ id: number; name: string; value: number }> = [];
	let modals: Array<SvelteComponent> = [];

	onMount(() => {
		chartData = Object.values(
			data.reduce((res, vtuber) => {
				if (!res[vtuber.id]) res[vtuber.id] = { id: vtuber.id, name: vtuber.name, avg: 0 };

				res[vtuber.id].avg = vtuber.channels
					.reduce((res2, c) => [...res2, ...c.videos], [] as Array<vtuberResponseDataChannelVideo>)
					.filter((v) => v.start_date && v.end_date)
					.reduce(
						(avg, v, _, { length }) =>
							!v.start_date || !v.end_date ? avg : avg + (new Date(v.end_date).getTime() - new Date(v.start_date).getTime()) / length,
						0
					);
				return res;
			}, {} as { [id: number]: { id: number; name: string; avg: number } })
		)
			.sort((a, b) => (a.avg < b.avg ? 1 : -1))
			.slice(0, 10)
			.map((d) => ({
				id: d.id,
				name: d.name,
				value: d.avg
			}));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		modals[i].toggleOpen();
	};
</script>

<BarChart
	data={chartData}
	seriesName="Length"
	horizontal
	xaxisFormatter={(v) => intToDurationStr(parseInt(v))}
	tooltipYFormatter={(v) => (!v ? '0' : intToDurationStr(v))}
	on:click={onClick}
/>

{#each chartData as d, i}
	<VtuberModal id={d.id} title={d.name} bind:this={modals[i]} />
{/each}
