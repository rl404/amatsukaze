<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { onMount } from 'svelte';

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
	<div><Loading class="h-8 w-8" /></div>
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
