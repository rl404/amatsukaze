<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import AgencyModal from '$lib/components/modals/AgencyModal.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { AgencyResponseData } from '../../api/agencies/[id]/+server';

	let data: AgencyResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let modals: SvelteComponent[] = [];

	onMount(() => {
		axios
			.get(`/api/agencies?sort=-member&limit=10`)
			.then((resp) => {
				data = resp.data.data;
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
		data={data.map((d) => ({ name: d.name, value: d.member }))}
		horizontal
		on:click={onClick}
		seriesName="Members"
	/>

	{#each data as d, i}
		<AgencyModal id={d.id} name={d.name} image={d.image} bind:this={modals[i]} />
	{/each}
{/if}
