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
		const zodiac = data[d].name;
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
	<div class="flex size-full items-center justify-center">
		<Spinner class="dark:text-gray-400" />
	</div>
{:else if error !== ''}
	<div class="flex size-full items-center justify-center text-red-500">{error}</div>
{:else}
	<DonutChart {data} {onClick} />
{/if}
