<script lang="ts">
	import { getAxiosError, intToDurationStr } from '$lib/utils';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/statistics/vtubers/average-video-duration`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<div class="text-center font-bold text-5xl" title="in the last 2 months">{intToDurationStr(data * 1000)}</div>
{/if}
