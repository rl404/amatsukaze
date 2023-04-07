<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { compactInt } from '$lib/utils';
	import type { SvelteComponent } from 'svelte';
	import type { agencyResponseData } from '../../api/agencies/[id]/+server';
	import AgencyModal from '$lib/components/modals/AgencyModal.svelte';

	export let data: Array<agencyResponseData>;

	let modals: Array<SvelteComponent> = [];

	const chartData: Array<{ id: number; name: string; image: string; value: number }> = data
		.map((a) => ({
			id: a.id,
			name: a.name,
			image: a.image,
			value: a.subscriber
		}))
		.sort((a, b) => (a.value < b.value ? 1 : -1))
		.slice(0, 10);

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
	<AgencyModal id={d.id} title={d.name} image={d.image} sort="-subscriber" bind:this={modals[i]} />
{/each}
