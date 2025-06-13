<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { VtuberLanguageCountResponseData } from '../../api/statistics/vtubers/language-count/+server';

	export let limit: number = -1;

	let data: VtuberLanguageCountResponseData[];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/language-count`)
			.then((resp) => (data = resp.data.data.slice(0, limit)))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => window.open(`/vtubers?language_id=${data[d].id}`, '_blank')?.focus();
</script>

{#if loading}
	<div class="flex size-full items-center justify-center">
		<Spinner class="dark:text-gray-400" />
	</div>
{:else if error !== ''}
	<div class="flex size-full items-center justify-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d) => ({
			name: d.name,
			value: d.count
		}))}
		seriesName="Count"
		onClickArea={onClick}
	/>
{/if}
