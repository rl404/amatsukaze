<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { toTitleCase } from '$lib/utils/utils';
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
		window.open(`/vtubers?channel_types=${data[d].name.toUpperCase()}`, '_blank')?.focus();
	};
</script>

{#if loading}
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:else if error !== ''}
	<div class="flex h-full w-full items-center justify-center text-red-500">{error}</div>
{:else}
	<DonutChart data={data.map((d) => ({ ...d, name: toTitleCase(d.name) }))} {onClick} />
{/if}
