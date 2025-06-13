<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import type { ChannelType } from '$lib/types';
	import { intToDurationStr, relativeTime } from '$lib/utils/utils';
	import type { Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseDataChannelVideo } from '../../../routes/api/vtubers/[id]/+server';

	export let data: VtuberResponseDataChannelVideo;
	export let type: ChannelType;
	export let delay: number = 0;

	const startDate = !data.start_date
		? ''
		: `${new Date(data.start_date).toISOString().slice(0, 10)} ${new Date(
				data.start_date
			).toLocaleTimeString()}`;

	const duration =
		!data.start_date || new Date(data.start_date) > new Date()
			? -1
			: !data.end_date
				? 0
				: new Date(data.end_date).getTime() - new Date(data.start_date).getTime();

	const durationStr =
		duration === -1 ? 'upcoming' : duration === 0 ? 'live' : intToDurationStr(duration / 1000);

	const icons: { [key: string]: { icon: Component; color: string } } = {
		YOUTUBE: { icon: YoutubeIcon, color: 'text-red-500' },
		TWITCH: { icon: TwitchIcon, color: 'text-purple-500' },
		BILIBILI: { icon: BilibiliIcon, color: 'text-blue-500' },
		NICONICO: { icon: NiconicoIcon, color: 'text-black dark:text-white' }
	};
</script>

<RenderIfVisible class={$$props.class}>
	<a
		href={data.url}
		target="_blank"
		rel="noreferrer"
		class="clickable grid gap-1 pb-2 text-sm"
		title={data.title}
	>
		<div class="relative">
			<Image
				{delay}
				src={data.image && `/api/images/${data.image}`}
				alt={data.title}
				class="aspect-video size-full rounded-lg object-cover object-center"
			/>
			<span class="absolute right-1 bottom-1 rounded bg-black px-1 text-xs text-white uppercase">
				{durationStr}
			</span>
		</div>
		<h4 class="text-primary line-clamp-2">{data.title}</h4>
		<div class="flex items-center gap-2" title={startDate}>
			<svelte:component this={icons[type].icon} class={twMerge('size-4', icons[type].color)} />
			{data.start_date && relativeTime(new Date(data.start_date))}
		</div>
	</a>
</RenderIfVisible>
