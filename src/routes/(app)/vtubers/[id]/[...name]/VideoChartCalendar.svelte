<script lang="ts">
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import GlobeIcon from '$lib/components/icons/GlobeIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import VtuberVideoGrid from '$lib/components/layouts/VtuberVideoGrid.svelte';
	import { DayNames } from '$lib/const';
	import { Span, Tooltip } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberVideoMonth } from './utils';

	const ChannelIcons = {
		YOUTUBE: { icon: YoutubeIcon, class: 'text-red-500' },
		TWITCH: { icon: TwitchIcon, class: 'text-purple-500' },
		BILIBILI: { icon: BilibiliIcon, class: 'text-blue-500' },
		NICONICO: { icon: NiconicoIcon, class: 'text-black' },
		OTHER: { icon: GlobeIcon, class: '' }
	};

	export let data: VtuberVideoMonth;

	const today = new Date();
</script>

<div class="mx-auto grid w-full max-w-2xl grid-cols-7 gap-1 text-center">
	{#each DayNames as day, i}
		<Span class={twMerge('text-sm md:text-base', i === 0 || i === 6 ? '!text-red-500' : '')}>
			{day[0]}
		</Span>
	{/each}
	<div class="col-span-7 h-px bg-border" />
	{#each data.days as day}
		<div
			class={twMerge(
				'relative flex aspect-square items-center justify-center rounded-lg bg-border/70 p-1 text-xs dark:bg-border/30 md:text-sm',
				!day.focus && 'opacity-30',
				today.getFullYear() === data.year &&
					today.getMonth() === data.month &&
					today.getDate() === day.day &&
					day.focus &&
					'animate-pulse outline outline-1 outline-primary-500 md:outline-2'
			)}
		>
			<Span class="absolute left-1 top-0">{day.day}</Span>
			<div class="flex flex-wrap items-center justify-center gap-1 xl:gap-2">
				{#each day.videos as video}
					<a id={`${video.type}-${video.id}`} href={video.url} target="_blank" rel="noreferrer">
						<svelte:component
							this={ChannelIcons[video.type].icon}
							class={twMerge('size-3 md:size-4 xl:size-5', ChannelIcons[video.type].class)}
						/>
					</a>
					<Tooltip
						type="auto"
						class="z-10"
						triggeredBy={`#${video.type}-${video.id}`}
						placement="bottom"
					>
						<VtuberVideoGrid data={video} type={video.type} class="w-48 text-left" />
					</Tooltip>
				{/each}
			</div>
		</div>
	{/each}
</div>
