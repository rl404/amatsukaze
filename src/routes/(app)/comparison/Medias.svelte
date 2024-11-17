<script lang="ts">
	import ChannelBadge from '$lib/components/badges/ChannelBadge.svelte';
	import { channelSorter, getHostname, intToDurationStr, isEmptyArray } from '$lib/utils/utils';
	import { Card, P, Tooltip } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type {
		VtuberResponseData,
		VtuberResponseDataChannel,
		VtuberResponseDataChannelVideo
	} from '../../api/vtubers/[id]/+server';

	export let data: VtuberResponseData[] | any[] = [{}, {}, {}];

	const getVideoCount = (channels: VtuberResponseDataChannel[]): number => {
		return channels.reduce((res: number, c: VtuberResponseDataChannel) => res + c.videos.length, 0);
	};

	const getVideoAvgLength = (channels: VtuberResponseDataChannel[]): number => {
		return channels
			.reduce(
				(res: VtuberResponseDataChannelVideo[], c: VtuberResponseDataChannel) => [
					...res,
					...c.videos
				],
				[]
			)
			.filter((v: VtuberResponseDataChannelVideo) => v.start_date && v.end_date)
			.reduce(
				(avg: number, v: VtuberResponseDataChannelVideo, _: any, { length }: { length: number }) =>
					!v.start_date || !v.end_date
						? avg
						: avg + (new Date(v.end_date).getTime() - new Date(v.start_date).getTime()) / length,
				0
			);
	};
</script>

<Card size="none" class="grid grid-cols-3 gap-4">
	<h3 class="h3 col-span-3 text-center">
		<span class="border-l-4 border-primary-500 pl-2">Medias</span>
	</h3>
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-x')}>
			<h4 class="text-center font-bold">Channels</h4>
			{#if isEmptyArray(vtuber.channels)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.channels.sort(channelSorter) as channel}
					<div class="text-center">
						<ChannelBadge data={channel} />
					</div>
				{/each}
			{/if}
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-x')}>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Video Count</h4>
				{#if isEmptyArray(vtuber.channels)}
					<P class="text-center">-</P>
				{:else}
					<P class="text-center">
						{getVideoCount(vtuber.channels).toLocaleString()}
					</P>
					<Tooltip placement="bottom">In the last 2 months</Tooltip>
				{/if}
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Video Length</h4>
				{#if isEmptyArray(vtuber.channels)}
					<P class="text-center">-</P>
				{:else}
					<P class="text-center">
						{intToDurationStr(getVideoAvgLength(vtuber.channels) / 1000)}
					</P>
					<Tooltip placement="bottom">Average length in the last 2 months</Tooltip>
				{/if}
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-x')}>
			<h4 class="text-center font-bold">Social Medias</h4>
			{#if isEmptyArray(vtuber.social_medias)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.social_medias as url}
					<P class="text-center">
						<a href={url} class="clickable underline" target="_blank" rel="noreferrer">
							{getHostname(url)}
						</a>
					</P>
				{/each}
			{/if}
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-x')}>
			<h4 class="text-center font-bold">Official Websites</h4>
			{#if isEmptyArray(vtuber.official_websites)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.official_websites as url}
					<P class="text-center">
						<a href={url} class="clickable underline" target="_blank" rel="noreferrer">
							{getHostname(url)}
						</a>
					</P>
				{/each}
			{/if}
		</div>
	{/each}
</Card>
