<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { onMount } from 'svelte';

	type ChartData = {
		name: string;
		value: number;
	};

	let data: ChartData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/designer-count?top=10`)
			.then(
				(resp) =>
					(data = resp.data.data.map((d: { name: string; count: number }) => ({
						name: d.name,
						value: d.count
					})))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		window.open(`/vtubers?character_designer=${data[i].name}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div><Loading class="h-10 w-10" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<BarChart {data} horizontal on:click={onClick} />
{/if}
