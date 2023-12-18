<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import { relativeTime } from '$lib/utils/utils';
	import type { ComponentType } from 'svelte';
	import type { VtuberResponseDataChannelVideo } from '../../../routes/api/vtubers/[id]/+server';

	export let data: VtuberResponseDataChannelVideo;
	export let type: string;
	export { className as class };

	let className: string = '';

	const startDate = !data.start_date
		? ''
		: `${new Date(data.start_date).toISOString().slice(0, 10)} ${new Date(
				data.start_date
		  ).toLocaleTimeString()}`;

	const duration =
		!data.start_date || !data.end_date
			? 0
			: new Date(data.end_date).getTime() - new Date(data.start_date).getTime();

	const durationStr =
		duration === 0
			? 'upcoming'
			: new Date(duration).toISOString().slice(duration / 1000 >= 3600 ? 11 : 14, 19);

	const icons: { [key: string]: { icon: ComponentType; color: string } } = {
		YOUTUBE: { icon: YoutubeIcon, color: 'text-red-500' },
		TWITCH: { icon: TwitchIcon, color: 'text-purple-500' },
		BILIBILI: { icon: BilibiliIcon, color: 'text-blue-500' },
		NICONICO: { icon: NiconicoIcon, color: 'text-black dark:text-white' }
	};
</script>

<a class="{className} clickable" href={data.url} target="_blank" rel="noreferrer">
	<RenderIfVisible class="flex flex-col gap-1 text-sm">
		<div class="relative">
			<Image
				src={data.image && `/api/image/${data.image}`}
				alt={data.title}
				class="aspect-video h-full w-full rounded-lg bg-card object-cover object-top dark:bg-card-dark"
			/>
			<span class="absolute bottom-1 right-1 rounded bg-black px-1 text-xs text-white"
				>{durationStr}</span
			>
		</div>
		<div class="line-clamp-2" title={data.title}>{data.title}</div>
		<div class="flex items-center gap-2">
			<svelte:component this={icons[type].icon} class="h-4 w-4 {icons[type].color}" />
			<span class="subtitle" title={startDate}
				>{data.start_date && relativeTime(new Date(data.start_date))}</span
			>
		</div>
	</RenderIfVisible>
</a>
