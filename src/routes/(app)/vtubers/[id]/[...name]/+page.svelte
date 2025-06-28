<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import OfficeIcon from '$lib/components/icons/OfficeIcon.svelte';
	import UsersIcon from '$lib/components/icons/UsersIcon.svelte';
	import VideoIcon from '$lib/components/icons/VideoIcon.svelte';
	import { generateVtuberDescription, getWikiImg } from '$lib/utils/utils';
	import {
		Badge,
		Breadcrumb,
		BreadcrumbItem,
		Card,
		Modal,
		TabItem,
		Tabs,
		Tooltip
	} from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberDetailResponse } from './+page.server';
	import AgencyMates from './AgencyMates.svelte';
	import Details from './Details.svelte';
	import Families from './Families.svelte';
	import Schema from './Schema.svelte';
	import Videos from './Videos.svelte';

	export let data: VtuberDetailResponse;

	$: vtuber = data.vtuber.data;
	$: histories = data.histories.data;
	$: agencies = data.agencies;
	$: families = data.families;

	let modal: boolean = false;
	const toggleModal = () => vtuber.image && (modal = !modal);
</script>

<Head
	title={vtuber.name}
	description={generateVtuberDescription(vtuber)}
	image={getWikiImg(vtuber.image)}
/>

<Schema {vtuber} {agencies} {families} />

{#key vtuber.id}
	<div class="grid grid-cols-4 gap-4 overflow-hidden">
		<Breadcrumb class="col-span-4">
			<BreadcrumbItem home href="/">Home</BreadcrumbItem>
			<BreadcrumbItem href="/vtubers">Vtubers</BreadcrumbItem>
			<BreadcrumbItem>{vtuber.name}</BreadcrumbItem>
		</Breadcrumb>
		<div class="relative col-span-4 flex flex-wrap items-center justify-between gap-2">
			<TextOutline class="absolute -z-10 opacity-20">{vtuber.name}</TextOutline>
			<h1 class="h1">
				<a
					href="{PUBLIC_VTUBER_WIKI_HOST}/{vtuber.name}"
					target="_blank"
					rel="noreferrer"
					class="clickable"
				>
					{vtuber.name}
				</a>
				<span>{vtuber.emoji}</span>
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
			<Card class="sticky top-20 max-w-full" onclick={toggleModal}>
				<Image
					src={getWikiImg(vtuber.image, 0, 400)}
					alt={vtuber.name}
					class={twMerge(
						'border-border max-h-96 rounded-t-lg border-b object-contain object-top sm:max-h-max',
						!vtuber.caption && 'rounded-lg border-0',
						vtuber.image && 'clickable cursor-pointer'
					)}
					loadingClass="aspect-portrait"
					errorClass="aspect-portrait"
				/>
				<div class={twMerge('p-4 text-center break-all italic', !vtuber.caption && 'hidden')}>
					{vtuber.caption}
				</div>
			</Card>
		</div>
		<div class="col-span-4 sm:col-span-3">
			<Tabs
				tabStyle="pill"
				ulClass="flex-wrap"
				contentClass="p-0 bg-transparent dark:bg-transparent"
			>
				<TabItem
					open
					activeClass="dark:bg-primary-500 dark:text-primary bg-primary-600 rounded-lg px-4 py-3 text-white"
				>
					{#snippet titleSlot()}
						<h2 class="flex items-center gap-2">
							<InfoIcon class="size-4" />
							Details
						</h2>
					{/snippet}
					<Details {vtuber} {histories} />
				</TabItem>
				<TabItem
					activeClass="dark:bg-primary-500 dark:text-primary bg-primary-600 rounded-lg px-4 py-3 text-white"
					disabled={agencies.length === 0}
				>
					{#snippet titleSlot()}
						<h2 class="flex items-center gap-2">
							<OfficeIcon class="size-4" />
							Agency-mates
						</h2>
					{/snippet}
					<AgencyMates {vtuber} {agencies} />
				</TabItem>
				<TabItem
					activeClass="dark:bg-primary-500 dark:text-primary bg-primary-600 rounded-lg px-4 py-3 text-white"
					disabled={families.length === 0}
				>
					{#snippet titleSlot()}
						<h2 class="flex items-center gap-2">
							<UsersIcon class="size-4" />
							Families
						</h2>
					{/snippet}
					<Families {vtuber} {families} />
				</TabItem>
				<TabItem
					activeClass="dark:bg-primary-500 dark:text-primary bg-primary-600 rounded-lg px-4 py-3 text-white"
					disabled={vtuber.video_count === 0}
				>
					{#snippet titleSlot()}
						<h2 class="flex items-center gap-2">
							<VideoIcon class="size-4" />
							Videos
						</h2>
					{/snippet}
					<Videos {vtuber} />
				</TabItem>
			</Tabs>
		</div>
	</div>

	<Modal title={vtuber.name} bind:open={modal} outsideclose autoclose>
		<Image
			src={getWikiImg(vtuber.image, 0, 0)}
			alt={vtuber.name}
			class="border-border m-auto rounded-lg border"
			loadingClass="aspect-portrait"
			errorClass="aspect-portrait"
		/>
	</Modal>
{/key}
