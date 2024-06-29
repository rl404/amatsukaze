<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import OfficeIcon from '$lib/components/icons/OfficeIcon.svelte';
	import UsersIcon from '$lib/components/icons/UsersIcon.svelte';
	import VideoIcon from '$lib/components/icons/VideoIcon.svelte';
	import { generateVtuberDescription, getWikiImg } from '$lib/utils/utils';
	import { Badge, Breadcrumb, BreadcrumbItem, Card, TabItem, Tabs, Tooltip } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberDetailResponse } from './+page.server';
	import AgencyMates from './AgencyMates.svelte';
	import Details from './Details.svelte';
	import Families from './Families.svelte';
	import Schema from './Schema.svelte';
	import Videos from './Videos.svelte';

	export let data: VtuberDetailResponse;

	$: vtuber = data.vtuber.data;
	$: agencies = data.agencies;
	$: families = data.families;
</script>

<Head
	title={vtuber.name}
	description={generateVtuberDescription(vtuber)}
	image={getWikiImg(vtuber.image)}
/>

<Schema {vtuber} {agencies} {families} />

<div class="grid grid-cols-4 gap-4">
	<Breadcrumb class="col-span-4">
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/vtubers">Vtubers</BreadcrumbItem>
		<BreadcrumbItem>{vtuber.name}</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-span-4 flex flex-wrap items-center justify-between gap-2">
		<h1>
			<a
				href="{PUBLIC_VTUBER_WIKI_HOST}/{vtuber.name}"
				target="_blank"
				rel="noreferrer"
				class="clickable"
			>
				{vtuber.name}
				<span>{vtuber.emoji}</span>
			</a>
		</h1>
		<div class="flex basis-full items-center gap-2 sm:basis-auto">
			{#if vtuber.retirement_date}
				<Badge large color="red">Retired</Badge>
			{:else}
				<Badge large color="green">Active</Badge>
			{/if}
			{#if vtuber.has_2d}
				<Badge large color="pink">2D Model</Badge>
				<Tooltip>has 2D model</Tooltip>
			{/if}
			{#if vtuber.has_3d}
				<Badge large color="indigo">3D Model</Badge>
				<Tooltip>has 3D model</Tooltip>
			{/if}
		</div>
	</div>
	<div class="col-span-4 sm:col-span-1">
		<Card size="none" padding="none" class="sticky top-20">
			<Image
				src={getWikiImg(vtuber.image, 0)}
				alt={vtuber.name}
				class={twMerge(
					'max-h-96 rounded-t-lg border-b border-border object-contain object-top sm:max-h-max',
					!vtuber.caption && 'rounded-lg border-0'
				)}
				loadingClass="aspect-portrait"
				errorClass="aspect-portrait"
			/>
			<div class={twMerge('break-all p-4 text-center italic', !vtuber.caption && 'hidden')}>
				{vtuber.caption}
			</div>
		</Card>
	</div>
	<div class="col-span-4 sm:col-span-3">
		<Tabs tabStyle="pill" contentClass="mt-2 sm:mt-4">
			<TabItem open>
				<div slot="title" class="flex items-center gap-2">
					<InfoIcon class="size-4" />
					Details
				</div>
				<Details {vtuber} />
			</TabItem>
			{#if agencies.length > 0}
				<TabItem>
					<div slot="title" class="flex items-center gap-2">
						<OfficeIcon class="size-4" />
						Agency-mates
					</div>
					<AgencyMates {vtuber} {agencies} />
				</TabItem>
			{/if}
			{#if families.length > 0}
				<TabItem>
					<div slot="title" class="flex items-center gap-2">
						<UsersIcon class="size-4" />
						Families
					</div>
					<Families {vtuber} {families} />
				</TabItem>
			{/if}
			{#if vtuber.video_count > 0}
				<TabItem>
					<div slot="title" class="flex items-center gap-2">
						<VideoIcon class="size-4" />
						Videos
					</div>
					<Videos {vtuber} />
				</TabItem>
			{/if}
		</Tabs>
	</div>
</div>
