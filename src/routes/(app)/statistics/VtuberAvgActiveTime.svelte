<script lang="ts">
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Spinner, Tooltip } from 'flowbite-svelte';
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
	<div><Spinner class="dark:text-gray-400" /></div>
{:else if error !== ''}
	<div class="text-red-500">{error}</div>
{:else}
	<div class="h1">
		{parseFloat((data / (30 * 12)).toFixed(1)).toLocaleString()} years
	</div>
	<Tooltip placement="bottom">{parseInt(data.toFixed(0)).toLocaleString()} days</Tooltip>
{/if}
