<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	let data: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(
				`/api/vtubers?mode=simple&sort=debut_date&exclude_retired=true&start_debut_year=1&limit=20`
			)
			.then((resp) => {
				data = resp.data.data.map((d: VtuberResponseData) => ({
					...d,
					debut_date: !d.debut_date ? new Date() : new Date(d.debut_date),
					retirement_date: new Date()
				}));
			})
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
		data={data.map((d) => ({
			name: d.name,
			value:
				!d.debut_date || !d.retirement_date
					? 0
					: (new Date(d.retirement_date).getTime() - new Date(d.debut_date).getTime()) /
						(1000 * 3600 * 24 * 30 * 12)
		}))}
		seriesName="Years"
		on:clickArea={onClick}
	/>
{/if}
