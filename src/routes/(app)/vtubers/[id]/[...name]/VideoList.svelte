<script lang="ts">
	import VtuberVideoGrid from '$lib/components/layouts/VtuberVideoGrid.svelte';
	import { intToDurationStr } from '$lib/utils/utils';
	import { Badge, Button, Card } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import type { VtuberVideo } from './utils';

	export let vtuber: VtuberResponseData;

	let show: boolean = false;

	$: allVideos = vtuber.channels
		.reduce(
			(res, c) => [...res, ...c.videos.map((v) => ({ ...v, type: c.type }))],
			[] as VtuberVideo[]
		)
		.sort((a, b) => {
			if (!a.start_date) return -1;
			if (!b.start_date) return 1;
			return a.start_date < b.start_date ? 1 : -1;
		});

	$: avgLength = allVideos
		.filter((v) => v.start_date && v.end_date)
		.reduce(
			(avg, v, _, { length }) =>
				!v.start_date || !v.end_date
					? avg
					: avg + (new Date(v.end_date).getTime() - new Date(v.start_date).getTime()) / length,
			0
		);

	$: videos = allVideos.length > 12 && !show ? allVideos.slice(0, 12) : allVideos;

	const showMore = () => {
		show = true;
		videos = allVideos;
	};

	const showLess = () => {
		show = false;
		videos = allVideos.slice(0, 12);
	};
</script>

<Card size="none" class="gap-4">
	<div class="flex items-center justify-between gap-4">
		<div class="border-l-4 border-primary-500 pl-2">
			<div class="flex items-center gap-2">
				<h3 class="h3 flex items-center gap-2">Recent Videos</h3>
				<Badge>{vtuber.video_count.toLocaleString()}</Badge>
			</div>
			<div>In the last 2 months</div>
		</div>
		<div class="text-right">
			<h3>Average Length</h3>
			<div class="h3 text-right">{intToDurationStr(avgLength / 1000)}</div>
		</div>
	</div>
	<div class="grid grid-cols-24 gap-2">
		{#each videos as video}
			<VtuberVideoGrid
				data={video}
				type={video.type}
				delay={500}
				class="col-span-12 md:col-span-8 lg:col-span-12 xl:col-span-8 2xl:col-span-6"
			/>
		{/each}
	</div>
	{#if allVideos.length > 12}
		<div class="col-span-24 text-center">
			{#if !show}
				<Button size="sm" on:click={showMore}>Show more</Button>
			{:else}
				<Button size="sm" on:click={showLess}>Show less</Button>
			{/if}
		</div>
	{/if}
</Card>
