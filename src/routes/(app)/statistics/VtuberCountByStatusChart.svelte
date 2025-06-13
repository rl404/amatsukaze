<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
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
		switch (d) {
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
	<div class="flex size-full items-center justify-center">
		<Spinner class="dark:text-gray-400" />
	</div>
{:else if error !== ''}
	<div class="flex size-full items-center justify-center text-red-500">{error}</div>
{:else}
	<DonutChart
		data={[
			{ name: 'Active', value: activeData },
			{ name: 'Retired', value: retiredData }
		]}
		{onClick}
	/>
{/if}
