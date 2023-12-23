<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { toTitleCase } from '$lib/utils/utils';
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
			.get(`/api/statistics/vtubers/channel-type-count`)
			.then(
				(resp) =>
					(data = resp.data.data.map((d: { channel_type: string; count: number }) => ({
						name: d.channel_type,
						value: d.count
					})))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const i = d.detail;
		const channelType = data[i].name.toUpperCase();
		window.open(`/vtubers?channel_types=${channelType}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div><Loading class="h-10 w-10" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart data={data.map((d) => ({ ...d, name: toTitleCase(d.name) }))} on:click={onClick} />
{/if}
