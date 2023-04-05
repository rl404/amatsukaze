<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import AgencyModal from '$lib/components/modals/AgencyModal.svelte';

	export let data: Array<vtuberResponseData>;

	let modals: Array<SvelteComponent> = [];

	const chartData: Array<{ id: number; name: string; image: string; value: number }> = Object.values(
		data.reduce((res, curr) => {
			curr.agencies?.forEach((a) => {
				if (!res[a.id]) res[a.id] = { id: a.id, name: a.name, image: a.image, value: 0 };
				res[a.id].value++;
			});
			return res;
		}, {} as { [id: number]: { id: number; name: string; image: string; value: number } })
	)
		.sort((a, b) => (a.value < b.value ? 1 : -1))
		.slice(0, 10);

	const onClick = (d: any) => {
		const i = d.detail;
		modals[i].toggleOpen();
	};
</script>

<BarChart data={chartData} horizontal on:click={onClick} />

{#each chartData as d, i}
	<AgencyModal id={d.id} title={d.name} image={d.image} bind:this={modals[i]} />
{/each}
