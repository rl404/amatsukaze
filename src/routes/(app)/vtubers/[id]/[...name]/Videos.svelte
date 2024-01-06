<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import VideoLayoutButton from '$lib/components/buttons/VideoLayoutButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import VideoGrid from '$lib/components/layouts/VideoGrid.svelte';
	import VideoList from '$lib/components/layouts/VideoList.svelte';
	import type { VideoLayout } from '$lib/types';
	import { intToDurationStr } from '$lib/utils/utils';
	import type {
		VtuberResponseDataChannel,
		VtuberResponseDataChannelVideo
	} from '../../../../api/vtubers/[id]/+server';

	export let data: VtuberResponseDataChannel[];

	type VtuberVideo = VtuberResponseDataChannelVideo & { type: string };

	$: videoData = data
		.reduce(
			(res, c) => [...res, ...c.videos.map((v) => ({ ...v, type: c.type }))],
			[] as VtuberVideo[]
		)
		.sort((a, b) => {
			if (!a.start_date) return -1;
			if (!b.start_date) return 1;
			return a.start_date < b.start_date ? 1 : -1;
		});

	$: avgLength = videoData
		.filter((v) => v.start_date && v.end_date)
		.reduce(
			(avg, v, _, { length }) =>
				!v.start_date || !v.end_date
					? avg
					: avg + (new Date(v.end_date).getTime() - new Date(v.start_date).getTime()) / length,
			0
		);

	$: videos = videoData.length > 12 && !show ? videoData.slice(0, 12) : videoData;

	let layout: VideoLayout = 'grid';
	let show: boolean = false;

	const showMore = () => {
		show = true;
		videos = videoData;
	};

	const showLess = () => {
		show = false;
		videos = videoData.slice(0, 12);
	};
</script>

<div class="grid grid-cols-6 gap-2">
	<div class="col-span-6 flex items-center gap-2">
		<Border>
			<h3 class="pointer-events-none whitespace-nowrap px-4 font-bold" title="in the last 2 months">
				Recent Videos ({videoData.length.toLocaleString()})
			</h3>
		</Border>
		<div class="text-sm" title="average video length">
			<span class="pointer-events-none">{intToDurationStr(avgLength / 1000)}</span>
		</div>
		<VideoLayoutButton bind:value={layout} class="h-4 w-4" />
	</div>
	{#each videos as video}
		{#if layout === 'grid'}
			<VideoGrid class="col-span-3 pb-4 md:col-span-2" data={video} type={video.type} />
		{:else if layout === 'list'}
			<VideoList class="col-span-6" data={video} type={video.type} />
		{/if}
	{/each}
	{#if videoData.length > 12}
		{#if !show}
			<div class="col-span-6 text-center">
				<Button color on:click={showMore} class="p-1 px-2 text-sm">Show more</Button>
			</div>
		{:else}
			<div class="col-span-6 text-center">
				<Button color on:click={showLess} class="p-1 px-2 text-sm">Show less</Button>
			</div>
		{/if}
	{/if}
</div>
