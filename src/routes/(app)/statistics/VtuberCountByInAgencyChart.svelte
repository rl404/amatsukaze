<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let inAgencyData: number = 0;
	let notInAgencyData: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/in-agency-count`)
			.then((resp) => {
				inAgencyData = resp.data.data.in_agency;
				notInAgencyData = resp.data.data.not_in_agency;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		switch (d.detail) {
			case 0:
				window.open(`/vtubers?in_agency=false`, '_blank')?.focus();
				break;
			case 1:
				window.open(`/vtubers?in_agency=true`, '_blank')?.focus();
				break;
		}
	};
</script>

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart
		data={[
			{ name: 'Independent', value: notInAgencyData },
			{ name: 'In Agency', value: inAgencyData }
		]}
		on:click={onClick}
	/>
{/if}
