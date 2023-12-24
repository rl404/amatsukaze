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
			.get(`/api/statistics/vtubers/zodiac-count`)
			.then(
				(resp) =>
					(data = resp.data.data.map((d: { zodiac: string; count: number }) => ({
						name: d.zodiac,
						value: d.count
					})))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		const zodiac = data[i].name;
		if (zodiac !== 'other') {
			window.open(`/vtubers?zodiacs=${zodiac}`, '_blank')?.focus();
			return;
		}

		const excludedZodiac = data
			.filter((d) => d.name !== 'other')
			.map((d) => '-' + d.name)
			.join(',');

		window.open(`/vtubers?zodiacs=${excludedZodiac}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart {data} on:click={onClick} />
{/if}
