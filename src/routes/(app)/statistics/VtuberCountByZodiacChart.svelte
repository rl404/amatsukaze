<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: Array<{ name: string; value: number }> = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/zodiac-count`)
			.then((resp) => {
				data = resp.data.data.map((d: { zodiac: string; count: number }) => ({ name: d.zodiac, value: d.count }));
			})
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
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart {data} on:click={onClick} />
{/if}
