<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
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
			.get(`/api/statistics/vtubers/blood-type-count?top=5`)
			.then(
				(resp) =>
					(data = resp.data.data.map((d: { blood_type: string; count: number }) => ({
						name: d.blood_type,
						value: d.count
					})))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		const bloodType = data[i].name;
		if (bloodType !== 'other') {
			window.open(`/vtubers?blood_types=${bloodType}`, '_blank')?.focus();
			return;
		}

		const excludedBloodType = data
			.filter((d) => d.name !== 'other')
			.map((d) => '-' + d.name)
			.join(',');

		window.open(`/vtubers?blood_types=${excludedBloodType}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:else if error !== ''}
	<div class="flex h-full w-full items-center justify-center text-red-500">{error}</div>
{:else}
	<DonutChart {data} on:click={onClick} />
{/if}
