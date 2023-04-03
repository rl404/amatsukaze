<script lang="ts">
	import { relativeTime, toTitleCase } from '$lib/utils';
	import type { vtuberResponseDataChannelVideo } from '../../../routes/api/vtubers/[id]/+server';
	import BilibiliIcon from '../icons/BilibiliIcon.svelte';
	import NiconicoIcon from '../icons/NiconicoIcon.svelte';
	import TwitchIcon from '../icons/TwitchIcon.svelte';
	import YoutubeIcon from '../icons/YoutubeIcon.svelte';
	import Image from '../Image.svelte';

	export let data: vtuberResponseDataChannelVideo;
	export let type: string;

	export { className as class };
	let className: string = '';

	const startDate = !data.start_date
		? ''
		: `${new Date(data.start_date).toISOString().slice(0, 10)} ${new Date(data.start_date).toLocaleTimeString()}`;

	const duration = !data.start_date || !data.end_date ? 0 : new Date(data.end_date).getTime() - new Date(data.start_date).getTime();

	const durationStr = duration === 0 ? 'upcoming' : new Date(duration).toISOString().slice(duration / 1000 >= 3600 ? 11 : 14, 19);

	const icons: { [key: string]: { icon: any; color: string } } = {
		YOUTUBE: { icon: YoutubeIcon, color: 'text-red-500' },
		TWITCH: { icon: TwitchIcon, color: 'text-purple-500' },
		BILIBILI: { icon: BilibiliIcon, color: 'text-blue-500' },
		NICONICO: { icon: NiconicoIcon, color: 'text-black dark:text-white' }
	};
</script>

<div class={className}>
	<div class="flex flex-col gap-1 pb-4">
		<a class="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg" href={data.url} target="_blank" rel="noreferrer">
			<span class="absolute right-1 bottom-1 px-1 text-xs text-white bg-black rounded">{durationStr}</span>
			<Image src={data.image && `/api/image/${data.image}`} alt={data.title} class="aspect-video h-full w-full object-cover object-top rounded-lg" />
		</a>
		<a class="text-sm line-clamp-2" href={data.url} target="_blank" rel="noreferrer" title={data.title}>
			{data.title}
		</a>
		<div class="text-sm inline-flex gap-2 items-center">
			<span title={toTitleCase(type)}><svelte:component this={icons[type].icon} class="w-4 h-4 {icons[type].color}" /></span>
			<span title={startDate} class="opacity-50">{!data.start_date ? '' : relativeTime(new Date(data.start_date))}</span>
		</div>
	</div>
</div>
