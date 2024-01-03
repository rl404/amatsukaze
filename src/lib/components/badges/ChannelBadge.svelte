<script lang="ts">
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import GlobeIcon from '$lib/components/icons/GlobeIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import { compactInt, toTitleCase } from '$lib/utils/utils';
	import type { ComponentType } from 'svelte';
	import type { VtuberResponseDataChannel } from '../../../routes/api/vtubers/[id]/+server';

	export let data: VtuberResponseDataChannel;

	let icon: ComponentType = GlobeIcon;
	let bgColor: string = 'bg-gray-500 hover:bg-gray-700';

	switch (data.type) {
		case 'YOUTUBE':
			icon = YoutubeIcon;
			bgColor = 'bg-red-500 hover:bg-red-700';
			break;
		case 'TWITCH':
			icon = TwitchIcon;
			bgColor = 'bg-purple-500 hover:bg-purple-700';
			break;
		case 'BILIBILI':
			icon = BilibiliIcon;
			bgColor = 'bg-blue-500 hover:bg-blue-700';
			break;
		case 'NICONICO':
			icon = NiconicoIcon;
			bgColor = 'bg-black hover:bg-gray-600';
	}
</script>

<div itemprop="publishingPrinciples" itemscope itemtype="https://schema.org/CreativeWork">
	<a
		class="{bgColor} flex w-max max-w-[90%] items-center gap-2 rounded px-2 text-sm font-medium text-white"
		href={data.url}
		target="_blank"
		rel="noreferrer"
		title={data.name || ''}
		itemprop="url"
	>
		<span>
			<svelte:component this={icon} class="h-3 w-3" />
		</span>
		{#if !data.name}
			<span itemprop="additionalType">{toTitleCase(data.type)}</span>
		{:else}
			<meta itemprop="additionalType" content={toTitleCase(data.type)} />
			<meta itemprop="name" content={data.name} />
			<meta itemprop="size" content={data.subscriber.toString()} />
			<span class="line-clamp-1" itemprop="name">{data.name}</span>
			<span>{compactInt(data.subscriber)}</span>
		{/if}
	</a>
</div>
