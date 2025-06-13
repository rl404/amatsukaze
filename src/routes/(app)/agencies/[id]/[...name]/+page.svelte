<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import UsersIcon from '$lib/components/icons/UsersIcon.svelte';
	import { compactInt, generateAgencyDescription, getWikiImg } from '$lib/utils/utils';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Card,
		Modal,
		P,
		TabItem,
		Tabs,
		Tooltip
	} from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { AgencyDetailResponse } from './+page.server';
	import Events from './Events.svelte';
	import Members from './Members.svelte';
	import Schema from './Schema.svelte';

	export let data: AgencyDetailResponse;

	$: agency = data.agency.data;
	$: vtubers = data.vtubers.data;

	let modal: boolean = false;
	const toggleModal = () => agency.image && (modal = !modal);
</script>

<Head
	title={agency.name}
	description={generateAgencyDescription(agency)}
	image={getWikiImg(agency.image)}
/>

<Schema {agency} {vtubers} />

<div class="grid grid-cols-4 gap-4 overflow-hidden">
	<Breadcrumb class="col-span-4">
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/agencies">Agencies</BreadcrumbItem>
		<BreadcrumbItem>{agency.name}</BreadcrumbItem>
	</Breadcrumb>
	<div class="relative col-span-4 flex flex-wrap items-center">
		<TextOutline class="absolute -z-10 opacity-20">{agency.name}</TextOutline>
		<h1 class="h1">
			<a
				href="{PUBLIC_VTUBER_WIKI_HOST}/{agency.name}"
				target="_blank"
				rel="noreferrer"
				class="clickable"
			>
				{agency.name}
			</a>
		</h1>
	</div>
	<div class="col-span-4 sm:col-span-1">
		<div class="sticky top-20 flex flex-col gap-4">
			<Card class="max-w-full" onclick={toggleModal}>
				<Image
					src={getWikiImg(agency.image, 0, 400)}
					alt={agency.name}
					class={twMerge(
						'max-h-96 rounded-lg object-contain object-center p-4 sm:max-h-max',
						agency.image && 'clickable cursor-pointer'
					)}
					loadingClass="aspect-card"
					errorClass="aspect-card"
				/>
			</Card>
			<div class="flex items-center justify-between gap-2">
				<h3 class="font-bold">Member Count</h3>
				<P>{agency.member.toLocaleString()}</P>
			</div>
			<div class="flex items-center justify-between gap-2">
				<h3 class="font-bold">Total Subscriber</h3>
				<P>{compactInt(agency.subscriber)}</P>
				<Tooltip placement="bottom">{agency.subscriber.toLocaleString()}</Tooltip>
			</div>
		</div>
	</div>
	<div class="col-span-4 sm:col-span-3">
		<Tabs tabStyle="pill" ulClass="flex-wrap" contentClass="p-0 bg-transparent dark:bg-transparent">
			<TabItem
				open
				activeClass="dark:bg-primary-500 dark:text-primary bg-primary-600 rounded-lg px-4 py-3 text-white"
			>
				{#snippet titleSlot()}
					<h2 class="flex items-center gap-2">
						<UsersIcon class="size-4" />
						Members
					</h2>
				{/snippet}
				<Members {vtubers} />
			</TabItem>
			{#if vtubers.length > 0}
				<TabItem
					activeClass="dark:bg-primary-500 dark:text-primary bg-primary-600 rounded-lg px-4 py-3 text-white"
				>
					{#snippet titleSlot()}
						<h2 class="flex items-center gap-2">
							<CalendarIcon class="size-4" />
							Events
						</h2>
					{/snippet}
					<Events {vtubers} />
				</TabItem>
			{/if}
		</Tabs>
	</div>
</div>

<Modal title={agency.name} bind:open={modal} outsideclose autoclose>
	<Image
		src={getWikiImg(agency.image, 0, 0)}
		alt={agency.name}
		class="border-border m-auto rounded-lg border p-4"
		loadingClass="aspect-card"
		errorClass="aspect-card"
	/>
</Modal>
