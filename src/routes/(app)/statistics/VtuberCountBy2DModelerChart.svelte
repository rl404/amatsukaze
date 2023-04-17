<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: Array<{ name: string; value: number }> = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/2d-modeler-count?top=10`)
			.then((resp) => {
				data = resp.data.data.map((d: { name: string; count: number }) => ({ name: d.name, value: d.count }));
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		window.open(`/vtubers?character_2d_modeler=${data[i].name}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<BarChart {data} horizontal on:click={onClick} />
{/if}
