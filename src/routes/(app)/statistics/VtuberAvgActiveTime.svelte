<script lang="ts">
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let data: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/average-active-time`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div><Spinner /></div>
{:else if error !== ''}
	<div class="text-red-500">{error}</div>
{:else}
	<h1 title={`${parseInt(data.toFixed(0)).toLocaleString()} days`}>
		{parseFloat((data / (30 * 12)).toFixed(1)).toLocaleString()} years
	</h1>
{/if}
