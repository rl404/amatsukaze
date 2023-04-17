<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import { compactInt, getAxiosError } from '$lib/utils';
	import { onMount, type SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import axios from 'axios';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';
	let modals: Array<SvelteComponent> = [];

	onMount(() => {
		axios
			.get(`/api/vtubers?sort=-subscriber&limit=10`)
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
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d) => ({ name: d.name, value: d.channels.reduce((max, c) => (c.subscriber > max ? c.subscriber : max), 0) }))}
		horizontal
		xaxisFormatter={(v) => compactInt(parseInt(v))}
		tooltipYFormatter={(v) => (!v ? '0' : compactInt(v))}
		on:click={onClick}
	/>

	{#each data as d, i}
		<VtuberModal id={d.id} title={d.name} bind:this={modals[i]} />
	{/each}
{/if}
