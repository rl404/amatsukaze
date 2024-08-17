<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { intToDurationStr } from '$lib/utils/utils';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	type ChartData = {
		id: number;
		name: string;
		duration: number;
	};

	let data: ChartData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/video-duration?top=10`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) =>
		window.open(`/vtubers/${data[d.detail].id}/${data[d.detail].name}`, '_blank')?.focus();
</script>

{#if loading}
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:else if error !== ''}
	<div class="flex h-full w-full items-center justify-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d) => ({ name: d.name, value: d.duration }))}
		seriesName="Duration"
		horizontal
		xaxisFormatter={(v) => intToDurationStr(parseInt(v))}
		tooltipYFormatter={(v) => (!v ? '0' : intToDurationStr(v))}
		on:clickArea={onClick}
	/>
{/if}
