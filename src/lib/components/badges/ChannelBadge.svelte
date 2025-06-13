<script lang="ts">
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import GlobeIcon from '$lib/components/icons/GlobeIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import { compactInt, toTitleCase } from '$lib/utils/utils';
	import { Badge } from 'flowbite-svelte';
	import type { Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseDataChannel } from '../../../routes/api/vtubers/[id]/+server';

	export let data: VtuberResponseDataChannel;

	let icon: Component = GlobeIcon;
	let badgeClass: string = 'bg-gray-500 dark:bg-gray-500 hover:bg-gray-600 hover:dark:bg-gray-600';

	switch (data.type) {
		case 'YOUTUBE':
			icon = YoutubeIcon;
			badgeClass = 'bg-red-500 dark:bg-red-500 hover:bg-red-600 hover:dark:bg-red-600';
			break;
		case 'TWITCH':
			icon = TwitchIcon;
			badgeClass = 'bg-purple-500 dark:bg-purple-500 hover:bg-purple-600 hover:dark:bg-purple-600';
			break;
		case 'BILIBILI':
			icon = BilibiliIcon;
			badgeClass = 'bg-blue-500 dark:bg-blue-500 hover:bg-blue-600 hover:dark:bg-blue-600';
			break;
		case 'NICONICO':
			icon = NiconicoIcon;
			badgeClass = 'bg-black dark:bg-black hover:bg-gray-900 hover:dark:bg-gray-900';
	}
</script>

<Badge
	class={twMerge('clickable text-white transition dark:text-white', badgeClass)}
	title={data.name || ''}
	href={data.url}
	target="_blank"
>
	<svelte:component this={icon} class="mr-2 size-3" />
	<span class="line-clamp-1">
		{#if !data.name}
			{toTitleCase(data.type)}
		{:else}
			{data.name}
		{/if}
	</span>
	{#if data.subscriber > 0}
		<span class="ml-2">
			{compactInt(data.subscriber)}
		</span>
	{/if}
</Badge>
