<script lang="ts">
	import VideoGrid from '$lib/components/layouts/VideoGrid.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Badge, Button, Card, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { VideoResponseData } from '../../api/videos/+server';
	import type { VideosPageResponseData } from './+page.server';

	export let title: string;
	export let link: string;
	export let data: VideosPageResponseData;

	let videos: VideoResponseData[] = [];
	let total: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(
				`/api/videos?start_date=${data.start}&end_date=${data.end}&is_finished=${data.is_finished}&sort=${data.sort}&limit=12`
			)
			.then((resp) => {
				videos = resp.data.data;
				total = resp.data.meta.total;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<Card size="none" class="gap-4">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			<h2 class="h2 border-l-4 border-primary-500 pl-2">{title}</h2>
			<Badge large>{total.toLocaleString()}</Badge>
		</div>
		<Button href={link} size="xs">MORE</Button>
	</div>
	{#if loading}
		<div class="text-center"><Spinner /></div>
	{:else if error !== ''}
		<div class="text-center text-red-500">{error}</div>
	{:else if videos.length === 0}
		<div class="text-center">No result...</div>
	{:else}
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
			{#each videos as video}
				<VideoGrid data={video} />
			{/each}
		</div>
	{/if}
</Card>
