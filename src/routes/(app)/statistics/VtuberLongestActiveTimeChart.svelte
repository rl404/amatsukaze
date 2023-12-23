<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	let data: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let modals: SvelteComponent[] = [];

	onMount(() => {
		axios
			.get(`/api/vtubers?sort=debut_date&exclude_retired=true&start_debut_year=1&limit=20`)
			.then((resp) => {
				data = resp.data.data.map((d: VtuberResponseData) => ({
					...d,
					debut_date: !d.debut_date ? new Date() : new Date(d.debut_date),
					retirement_date: new Date()
				}));
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		modals[i].toggleOpen();
	};
</script>

{#if loading}
	<div><Loading class="h-10 w-10" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d) => ({
			name: d.name,
			value:
				!d.debut_date || !d.retirement_date
					? 0
					: (new Date(d.retirement_date).getTime() - new Date(d.debut_date).getTime()) /
					  (1000 * 3600 * 24 * 30 * 12)
		}))}
		seriesName="Years"
		on:click={onClick}
	/>

	{#each data as d, i}
		<VtuberModal id={d.id} name={d.name} bind:this={modals[i]} />
	{/each}
{/if}
