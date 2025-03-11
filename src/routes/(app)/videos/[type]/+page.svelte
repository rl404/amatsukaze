<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import InfiniteScroll from '$lib/components/commons/InfiniteScroll.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import VideoGrid from '$lib/components/layouts/VideoGrid.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { Badge, Breadcrumb, BreadcrumbItem, Card, Spinner, Tooltip } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { VideoResponseData } from '../../../api/videos/+server';
	import type { VideoPageResponse } from './+page.server';

	export let data: VideoPageResponse;

	let videos: VideoResponseData[] = [];
	let newVideos: VideoResponseData[] = [];
	let total: number = 0;
	let page: number = 1;
	let hasMore: boolean = true;
	let loading: boolean = true;
	let error: string = '';

	$: videos = [...videos, ...newVideos];

	onMount(() => fetchData());

	const fetchData = () => {
		loading = true;
		error = '';

		axios
			.get(
				`/api/videos?start_date=${data.startDate}&end_date=${data.endDate}&is_finished=${data.isFinished}&sort=${data.sort}&page=${page}&limit=24`
			)
			.then((resp) => {
				newVideos = resp.data.data;
				total = resp.data.meta.total;
				hasMore = newVideos.length > 0;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const loadMore = () => {
		page++;
		fetchData();
	};
</script>

<Head title={data.title} description={data.description} image={data.image} />

<div class="grid gap-4 overflow-hidden">
	<Breadcrumb>
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/videos">Videos</BreadcrumbItem>
		<BreadcrumbItem>{data.title}</BreadcrumbItem>
	</Breadcrumb>
	<div class="relative flex items-center">
		<TextOutline class="absolute -z-10 opacity-20">{data.title}</TextOutline>
		<div class="flex items-center gap-4">
			<h1 class="h1 flex items-center gap-4">{data.title}</h1>
			<Badge large>{total.toLocaleString()}</Badge>
			<InfoIcon class="hidden size-5 sm:block" />
			<Tooltip placement="right">
				Data may not be accurate since the data are only updated once per day.
			</Tooltip>
		</div>
	</div>
	<Card size="none" padding="none" class="grid grid-cols-24 gap-4 p-2 sm:p-4">
		{#each videos as video}
			<VideoGrid class="col-span-12 sm:col-span-8 xl:col-span-6 2xl:col-span-4" data={video} />
		{/each}

		{#if loading}
			<div class="col-span-24 text-center"><Spinner /></div>
		{:else if error !== ''}
			<div class="col-span-24 text-center text-red-500">{error}</div>
		{:else if videos.length === 0}
			<div class="col-span-24 text-center">No result...</div>
		{:else}
			<InfiniteScroll {hasMore} window onLoadMore={loadMore} />
		{/if}
	</Card>
</div>
