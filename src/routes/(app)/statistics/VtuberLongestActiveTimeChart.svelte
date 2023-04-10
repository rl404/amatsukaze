<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';
	let modals: Array<SvelteComponent> = [];

	onMount(() => {
		axios
			.get(`/api/vtubers?sort=debut_date&exclude_retired=true&start_debut_year=1&limit=20`)
			.then((resp) => {
				data = resp.data.data.map((d: vtuberResponseData) => ({
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
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d) => ({
			name: d.name,
			value: !d.debut_date || !d.retirement_date ? 0 : (d.retirement_date.getTime() - d.debut_date.getTime()) / (1000 * 3600 * 24 * 30 * 12)
		}))}
		seriesName="Years"
		on:click={onClick}
	/>

	{#each data as d, i}
		<VtuberModal id={d.id} title={d.name} bind:this={modals[i]} />
	{/each}
{/if}
