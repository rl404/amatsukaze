<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let modals: Array<SvelteComponent> = [];

	let chartData: Array<{ id: number; name: string; value: number }> = [];

	onMount(() => {
		chartData = Object.entries(
			data.reduce((res: { [name: string]: number }, curr) => {
				if (!curr.debut_date) return res;
				const debut = new Date(curr.debut_date);
				if (debut.getFullYear() === 0) return res;
				const retired = !curr.retirement_date ? new Date() : new Date(curr.retirement_date);
				const diff = retired.getTime() - debut.getTime();
				res[curr.name] = diff / (1000 * 3600 * 24 * 30 * 12);
				return res;
			}, {})
		)
			.sort((a, b) => (a[1] < b[1] ? 1 : -1))
			.slice(0, 20)
			.map((d) => ({
				id: data.find((v) => v.name === d[0])?.id || 0,
				name: d[0],
				value: d[1]
			}));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		modals[i].toggleOpen();
	};
</script>

<BarChart data={chartData} seriesName="Years" on:click={onClick} />

{#each chartData as d, i}
	<VtuberModal id={d.id} title={d.name} bind:this={modals[i]} />
{/each}
