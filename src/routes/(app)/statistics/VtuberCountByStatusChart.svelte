<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let activeData: number = 0;
	let retiredData: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/status-count`)
			.then((resp) => {
				activeData = resp.data.data.active;
				retiredData = resp.data.data.retired;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		switch (d.detail) {
			case 0:
				window.open(`/vtubers?exclude_retired=true`, '_blank')?.focus();
				break;
			case 1:
				window.open(`/vtubers?exclude_active=true`, '_blank')?.focus();
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
			{ name: 'Active', value: activeData },
			{ name: 'Retired', value: retiredData }
		]}
		on:click={onClick}
	/>
{/if}
