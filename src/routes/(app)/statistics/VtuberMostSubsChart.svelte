<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { compactInt } from '$lib/utils/utils';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	let data: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/vtubers?mode=simple&sort=-subscriber&limit=10`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) =>
		window.open(`/vtubers/${data[d].id}/${data[d].name}`, '_blank')?.focus();
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
			value: d.subscriber
		}))}
		horizontal
		xaxisFormatter={(v) => compactInt(parseInt(v))}
		tooltipYFormatter={(v) => (!v ? '0' : compactInt(v))}
		onClickArea={onClick}
	/>
{/if}
