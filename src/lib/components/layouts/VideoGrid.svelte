<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import { getWikiImg, intToDurationStr, relativeTime, toURL } from '$lib/utils/utils';
	import { Avatar } from 'flowbite-svelte';
	import type { Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VideoResponseData } from '../../../routes/api/videos/+server';

	export let data: VideoResponseData;

	const startDate = !data.video_start_date
		? ''
		: `${new Date(data.video_start_date).toISOString().slice(0, 10)} ${new Date(
				data.video_start_date
			).toLocaleTimeString()}`;

	const duration =
		!data.video_start_date || new Date(data.video_start_date) > new Date()
			? -1
			: !data.video_end_date
				? 0
				: new Date(data.video_end_date).getTime() - new Date(data.video_start_date).getTime();

	const durationStr =
		duration === -1 ? 'upcoming' : duration === 0 ? 'live' : intToDurationStr(duration / 1000);

	const icons: { [key: string]: { icon: Component; color: string } } = {
		YOUTUBE: { icon: YoutubeIcon, color: 'text-red-500' },
		TWITCH: { icon: TwitchIcon, color: 'text-purple-500' },
		BILIBILI: { icon: BilibiliIcon, color: 'text-blue-500' },
		NICONICO: { icon: NiconicoIcon, color: 'text-black dark:text-white' }
	};
</script>

<RenderIfVisible class={twMerge($$props.class, 'relative grid gap-1 pb-2 text-sm')}>
	<a
		class="clickable relative"
		href={data.video_url}
		target="_blank"
		rel="noreferrer"
		title={data.video_title}
	>
		<Image
			src={data.video_image && `/api/images/${data.video_image}`}
			alt={data.video_title}
			class="aspect-video size-full rounded-lg object-cover object-center"
			delay={500}
		/>
		<span class="absolute right-1 bottom-1 rounded bg-black px-1 text-xs text-white uppercase">
			{durationStr}
		</span>
	</a>
	<a
		class="clickable text-primary line-clamp-2"
		href={data.video_url}
		target="_blank"
		rel="noreferrer"
		title={data.video_title}
	>
		{data.video_title}
	</a>
	<div class="flex items-center gap-2">
		<a href="/vtubers/{data.vtuber_id}/{toURL(data.vtuber_name)}" class="clickable min-w-7">
			<Avatar
				src={getWikiImg(data.vtuber_image)}
				alt={data.vtuber_name}
				class="size-7 object-cover object-top"
			/>
		</a>
		<div class="grid">
			<a href="/vtubers/{data.vtuber_id}/{toURL(data.vtuber_name)}" class="clickable line-clamp-1">
				{data.vtuber_name}
			</a>
			<div class="flex items-center gap-2" title={startDate}>
				<svelte:component
					this={icons[data.channel_type].icon}
					class={twMerge('size-4', icons[data.channel_type].color)}
				/>
				{data.video_start_date && relativeTime(new Date(data.video_start_date))}
			</div>
		</div>
	</div>
</RenderIfVisible>
