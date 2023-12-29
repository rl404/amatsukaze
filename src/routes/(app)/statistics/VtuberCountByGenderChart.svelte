<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
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
			.get(`/api/statistics/vtubers/gender-count`)
			.then(
				(resp) =>
					(data = resp.data.data.map((d: { gender: string; count: number }) => ({
						name: d.gender,
						value: d.count
					})))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const gender = data[d.detail].name;
		if (gender !== 'other') {
			window.open(`/vtubers?genders=${gender}`, '_blank')?.focus();
			return;
		}

		const excludedGender = data
			.filter((d) => d.name !== 'other')
			.map((d) => '-' + d.name)
			.join(',');

		window.open(`/vtubers?genders=${excludedGender}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart {data} on:click={onClick} />
{/if}
