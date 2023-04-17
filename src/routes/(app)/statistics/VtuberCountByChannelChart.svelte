<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { getAxiosError, toTitleCase } from '$lib/utils';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: Array<{ name: string; value: number }> = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/channel-type-count`)
			.then((resp) => {
				data = resp.data.data.map((d: { channel_type: string; count: number }) => ({ name: d.channel_type, value: d.count }));
			})
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
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart data={data.map((d) => ({ ...d, name: toTitleCase(d.name) }))} on:click={onClick} />
{/if}
