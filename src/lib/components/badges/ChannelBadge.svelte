<script lang="ts">
	import { compactInt, toTitleCase } from '$lib/utils';
	import type { vtuberResponseDataChannel } from '../../../routes/api/vtubers/[id]/+server';
	import BilibiliIcon from '../icons/BilibiliIcon.svelte';
	import GlobeIcon from '../icons/GlobeIcon.svelte';
	import NiconicoIcon from '../icons/NiconicoIcon.svelte';
	import TwitchIcon from '../icons/TwitchIcon.svelte';
	import YoutubeIcon from '../icons/YoutubeIcon.svelte';

	export let data: vtuberResponseDataChannel;

	let icon = GlobeIcon;
	let bgColor = 'bg-gray-500';
	let bgHoverColor = 'hover:bg-gray-700';

	switch (data.type) {
		case 'YOUTUBE':
			icon = YoutubeIcon;
			bgColor = 'bg-red-500';
			bgHoverColor = 'hover:bg-red-700';
			break;
		case 'TWITCH':
			icon = TwitchIcon;
			bgColor = 'bg-purple-500';
			bgHoverColor = 'hover:bg-purple-700';
			break;
		case 'BILIBILI':
			icon = BilibiliIcon;
			bgColor = 'bg-blue-500';
			bgHoverColor = 'hover:bg-blue-700';
			break;
		case 'NICONICO':
			icon = NiconicoIcon;
			bgColor = 'bg-black';
			bgHoverColor = 'hover:bg-gray-600';
	}
</script>

<a
	class="text-white text-sm font-medium px-2 rounded {bgColor} {bgHoverColor} inline-flex items-center gap-2 max-w-[90%]"
	href={data.url}
	target="_blank"
	rel="noreferrer"
	title={data.name || ''}
>
	<span>
		<svelte:component this={icon} class="w-3 h-3" />
	</span>
	{#if data.name === ''}
		<span>{toTitleCase(data.type)}</span>
	{:else}
		<span class="text-ellipsis overflow-x-hidden whitespace-nowrap">{data.name}</span>
		<span>{compactInt(data.subscriber)}</span>
	{/if}
</a>
