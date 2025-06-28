<script lang="ts">
	import BilibiliIcon from '$lib/components/icons/BilibiliIcon.svelte';
	import GlobeIcon from '$lib/components/icons/GlobeIcon.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import NiconicoIcon from '$lib/components/icons/NiconicoIcon.svelte';
	import TwitchIcon from '$lib/components/icons/TwitchIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import { ChartBorderColors, ChartTextColors } from '$lib/const';
	import { DarkTheme } from '$lib/utils/theme';
	import { compactInt, toTitleCase } from '$lib/utils/utils';
	import { Chart, Modal, Tooltip } from 'flowbite-svelte';
	import type { Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type {
		VtuberResponseData,
		VtuberResponseDataChannel
	} from '../../../../api/vtubers/[id]/+server';
	import type { VtuberHistoriesResponseData } from '../../../../api/vtubers/[id]/channel-history/+server';

	export let vtuber: VtuberResponseData;
	export let histories: VtuberHistoriesResponseData[];
	export let open: boolean;

	let channelI: number = 0;
	let darkTheme: boolean = false;

	$: filteredHistories = histories.filter(
		(h) =>
			h.channel_type === vtuber.channels[channelI].type &&
			h.channel_id === vtuber.channels[channelI].id
	);

	DarkTheme.subscribe((v) => (darkTheme = v));

	const getIcon = (channel: VtuberResponseDataChannel): Component => {
		switch (channel.type) {
			case 'YOUTUBE':
				return YoutubeIcon;
			case 'TWITCH':
				return TwitchIcon;
			case 'BILIBILI':
				return BilibiliIcon;
			case 'NICONICO':
				return NiconicoIcon;
			default:
				return GlobeIcon;
		}
	};

	const getIconClass = (channel: VtuberResponseDataChannel): string => {
		switch (channel.type) {
			case 'YOUTUBE':
				return 'text-red-500';
			case 'TWITCH':
				return 'text-purple-500';
			case 'BILIBILI':
				return 'text-blue-500';
			case 'NICONICO':
				return 'text-black dark:text-white';
			default:
				return 'text-gray-500';
		}
	};

	const getChartColor = (channel: VtuberResponseDataChannel): string => {
		switch (channel.type) {
			case 'YOUTUBE':
				return '#fb2c36';
			case 'TWITCH':
				return '#ad46ff';
			case 'BILIBILI':
				return '#2b7fff';
			case 'NICONICO':
				return darkTheme ? 'white' : 'black';
			default:
				return 'white';
		}
	};
</script>

<Modal bind:open size="xl">
	{#snippet header()}
		<div class="flex items-center gap-2">
			<h3>Subscriber Histories</h3>
			<InfoIcon class="size-4" />
			<Tooltip placement="right" arrow>Some data may be missing</Tooltip>
		</div>
	{/snippet}
	<div
		class="grid grid-cols-12 gap-4 divide-y divide-gray-300 sm:divide-x sm:divide-y-0 dark:divide-gray-700"
	>
		<div
			class="col-span-full flex flex-row flex-wrap gap-1 pb-4 sm:col-span-4 sm:flex-col sm:flex-nowrap sm:pr-4 md:col-span-3 md:pr-5"
		>
			{#each vtuber.channels.filter((c) => c.type !== 'OTHER') as channel, i}
				<button
					class={twMerge(
						'hover:text-primary flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-200 hover:dark:bg-gray-700',
						i === channelI && 'text-primary bg-gray-200 dark:bg-gray-700'
					)}
					onclick={() => (channelI = i)}
				>
					<div>
						<svelte:component
							this={getIcon(channel)}
							class={twMerge('size-5', getIconClass(channel))}
						/>
					</div>
					<div class="line-clamp-1" title={channel.name || toTitleCase(channel.type)}>
						{channel.name || toTitleCase(channel.type)}
					</div>
				</button>
			{/each}
		</div>
		{#key channelI}
			<div class="col-span-full flex flex-col gap-4 sm:col-span-8 md:col-span-9">
				<div class="flex flex-col">
					<div class="h5">Subscriber Count</div>
					<div class="aspect-chart">
						<Chart
							options={{
								chart: {
									id: `count-${channelI}`,
									group: 'history',
									height: '100%',
									type: 'area',
									toolbar: { show: false },
									zoom: { enabled: false }
								},
								series: [
									{
										name: 'Subscriber Count',
										data: filteredHistories.map((h) => h.subscriber)
									}
								],
								xaxis: {
									type: 'datetime',
									categories: filteredHistories.map((d) =>
										new Date(d.year, d.month, 1).toISOString().slice(0, 10)
									),
									labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
									axisBorder: { color: ChartBorderColors[darkTheme.toString()] },
									axisTicks: { color: ChartBorderColors[darkTheme.toString()] }
								},
								yaxis: [
									{
										seriesName: 'Subscriber Count',
										labels: {
											style: { colors: ChartTextColors[darkTheme.toString()] },
											formatter: (v) => compactInt(v)
										},
										axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
										axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
									}
								],
								colors: [getChartColor(vtuber.channels[channelI])],
								dataLabels: { enabled: false },
								legend: { labels: { colors: ChartTextColors[darkTheme.toString()] } },
								grid: {
									borderColor: ChartBorderColors[darkTheme.toString()],
									strokeDashArray: 5,
									xaxis: { lines: { show: false } },
									yaxis: { lines: { show: true } }
								},
								fill: {
									type: 'gradient',
									gradient: {
										type: 'vertical',
										shadeIntensity: 1,
										inverseColors: false,
										opacityFrom: 0.7,
										opacityTo: 0,
										stops: [20, 100]
									}
								},
								stroke: {
									curve: 'smooth',
									width: 2
								},
								tooltip: {
									theme: darkTheme ? 'dark' : 'light',
									intersect: false,
									shared: true,
									x: { format: 'MMM yyyy' },
									y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="h5">Subscriber Increment</div>
					<div class="aspect-chart">
						<Chart
							options={{
								chart: {
									id: `new-${channelI}`,
									group: 'history',
									height: '100%',
									type: 'bar',
									toolbar: { show: false },
									zoom: { enabled: false }
								},
								series: [
									{
										name: 'New Subscriber',
										data: filteredHistories.map((h, i) =>
											i === 0
												? null
												: filteredHistories[i].subscriber - filteredHistories[i - 1].subscriber
										)
									}
								],
								xaxis: {
									type: 'datetime',
									categories: filteredHistories.map((d) =>
										new Date(d.year, d.month, 1).toISOString().slice(0, 10)
									),
									labels: { style: { colors: ChartTextColors[darkTheme.toString()] } },
									axisBorder: { color: ChartBorderColors[darkTheme.toString()] },
									axisTicks: { color: ChartBorderColors[darkTheme.toString()] }
								},
								yaxis: [
									{
										seriesName: 'New Subscriber',
										labels: {
											style: { colors: ChartTextColors[darkTheme.toString()] },
											formatter: (v) => compactInt(v)
										},
										axisBorder: { show: true, color: ChartBorderColors[darkTheme.toString()] },
										axisTicks: { show: true, color: ChartBorderColors[darkTheme.toString()] }
									}
								],
								colors: [getChartColor(vtuber.channels[channelI])],
								dataLabels: { enabled: false },
								legend: { labels: { colors: ChartTextColors[darkTheme.toString()] } },
								grid: {
									borderColor: ChartBorderColors[darkTheme.toString()],
									strokeDashArray: 5,
									xaxis: { lines: { show: false } },
									yaxis: { lines: { show: true } }
								},
								fill: {
									type: 'solid'
								},
								stroke: {
									curve: 'smooth',
									width: 2
								},
								tooltip: {
									theme: darkTheme ? 'dark' : 'light',
									intersect: false,
									shared: true,
									x: { format: 'MMM yyyy' },
									y: { formatter: (v) => (!v ? '0' : v.toLocaleString()) }
								}
							}}
						/>
					</div>
				</div>
			</div>
		{/key}
	</div>
</Modal>
