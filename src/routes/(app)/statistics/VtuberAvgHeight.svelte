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
			.get(`/api/statistics/vtubers/average-height`)
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
	<div class="h1">{data.toFixed(0)} cm</div>
{/if}
