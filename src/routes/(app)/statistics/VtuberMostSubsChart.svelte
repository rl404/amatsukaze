<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { compactInt } from '$lib/utils/utils';
	import axios from 'axios';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	let data: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';
	let modals: SvelteComponent[] = [];

	onMount(() => {
		axios
			.get(`/api/vtubers?mode=simple&sort=-subscriber&limit=10`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => modals[d.detail].toggleOpen();
</script>

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d) => ({
			name: d.name,
			value: d.subscriber
		}))}
		horizontal
		xaxisFormatter={(v) => compactInt(parseInt(v))}
		tooltipYFormatter={(v) => (!v ? '0' : compactInt(v))}
		on:click={onClick}
	/>

	{#each data as d, i}
		<VtuberModal id={d.id} name={d.name} bind:this={modals[i]} />
	{/each}
{/if}
