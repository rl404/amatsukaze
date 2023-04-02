<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import VideoLayoutButton from '$lib/components/buttons/VideoLayoutButton.svelte';
	import VideoGrid from '$lib/components/layouts/VideoGrid.svelte';
	import VideoList from '$lib/components/layouts/VideoList.svelte';
	import type { vtuberResponseDataChannel, vtuberResponseDataChannelVideo } from '../../../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseDataChannel>;

	type vtuberVideo = vtuberResponseDataChannelVideo & { type: string };

	let videos = data
		.reduce((res, c) => [...res, ...c.videos.map((v) => ({ ...v, type: c.type }))], [] as Array<vtuberVideo>)
		.sort((a, b) => {
			if (!a.start_date) return -1;
			if (!b.start_date) return 1;
			return a.start_date < b.start_date ? 1 : -1;
		});

	let layout = 'grid';
</script>

<div class="grid grid-cols-6 gap-2">
	<div class="col-span-6 flex gap-2">
		<Border>
			<span class="px-4 font-bold whitespace-nowrap" title="recent 2 months">Recent Videos ({videos.length.toLocaleString()})</span>
		</Border>
		<VideoLayoutButton bind:value={layout} class="w-4 h-4" />
	</div>
	{#each videos as video}
		{#if layout === 'grid'}
			<VideoGrid class="col-span-3 md:col-span-2" data={video} type={video.type} />
		{:else if layout == 'list'}
			<VideoList class="col-span-6" data={video} type={video.type} />
		{/if}
	{/each}
</div>
