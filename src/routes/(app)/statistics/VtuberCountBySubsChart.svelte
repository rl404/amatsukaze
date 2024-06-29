<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	type ChartData = {
		min: number;
		max: number;
		count: number;
	};

	let data: ChartData[] = [];
	let loading: boolean = true;
	let error: string = '';

	const limits = [
		{ min: 0, max: 1e4, label: '<10K' },
		{ min: 1e4, max: 5e4, label: '10K-50K' },
		{ min: 5e4, max: 1e5, label: '50K-100K' },
		{ min: 1e5, max: 25e4, label: '100K-250K' },
		{ min: 25e4, max: 5e5, label: '250K-500K' },
		{ min: 5e5, max: 1e6, label: '500K-1M' },
		{ min: 1e6, max: 5e6, label: '1M-5M' },
		{ min: 5e6, max: 0, label: '>5M' }
	];

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/subscriber-count?interval=10000&max=5000000`)
			.then((resp) => {
				let tmpData = limits.map((l) => ({ min: l.min, max: l.max, count: 0 }));

				resp.data.data.forEach((d: { min: number; max: number; count: number }) => {
					let i = 0;
					for (i = 0; i < limits.length; i++) {
						if (limits[i].min <= d.min && limits[i].max >= d.max) break;
					}
					if (d.max === 0) i = limits.length - 1;
					tmpData[i].count += d.count;
				});

				data = tmpData;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		const limit = data[d.detail];
		window
			.open(
				`/vtubers?start_subscriber=${limit.min}&end_subscriber=${limit.max}&sort=-subscriber`,
				'_blank'
			)
			?.focus();
	};
</script>

{#if loading}
	<div class="flex h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:else if error !== ''}
	<div class="flex h-full w-full items-center justify-center text-red-500">{error}</div>
{:else}
	<BarChart
		data={data.map((d, i) => ({
			name: limits[i].label,
			value: d.count
		}))}
		on:clickArea={onClick}
	/>
{/if}
