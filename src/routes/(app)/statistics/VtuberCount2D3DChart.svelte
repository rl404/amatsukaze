<script lang="ts">
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let noneData: number = 0;
	let has2DOnlyData: number = 0;
	let has3DOnlyData: number = 0;
	let bothData: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/model-count`)
			.then((resp) => {
				noneData = resp.data.data.none;
				has2DOnlyData = resp.data.data.has_2d_only;
				has3DOnlyData = resp.data.data.has_3d_only;
				bothData = resp.data.data.both;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onClick = (d: any) => {
		switch (d.detail) {
			case 0:
				window.open(`/vtubers?has_2d=true&has_3d=true`, '_blank')?.focus();
				break;
			case 1:
				window.open(`/vtubers?has_2d=true&has_3d=false`, '_blank')?.focus();
				break;
			case 2:
				window.open(`/vtubers?has_2d=false&has_3d=true`, '_blank')?.focus();
				break;
			case 3:
				window.open(`/vtubers?has_2d=false&has_3d=false`, '_blank')?.focus();
				break;
		}
	};
</script>

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<DonutChart
		data={[
			{ name: '2D & 3D', value: bothData },
			{ name: '2D Only', value: has2DOnlyData },
			{ name: '3D Only', value: has3DOnlyData },
			{ name: 'None', value: noneData }
		]}
		on:click={onClick}
	/>
{/if}
