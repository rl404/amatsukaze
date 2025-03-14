<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

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
		switch (d) {
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
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:else if error !== ''}
	<div class="flex h-full w-full items-center justify-center text-red-500">{error}</div>
{:else}
	<DonutChart
		data={[
			{ name: 'Independent', value: notInAgencyData },
			{ name: 'In Agency', value: inAgencyData }
		]}
		{onClick}
	/>
{/if}
