<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import UsersIcon from '$lib/components/icons/UsersIcon.svelte';
	import { compactInt, getWikiImg } from '$lib/utils/utils';
	import { Breadcrumb, BreadcrumbItem, Card, P, TabItem, Tabs, Tooltip } from 'flowbite-svelte';
	import type { AgencyDetailResponse } from './+page.server';
	import Events from './Events.svelte';
	import Members from './Members.svelte';

	export let data: AgencyDetailResponse;

	$: agency = data.agency.data;
	$: vtubers = data.vtubers.data;
</script>

<Head
	title={agency.name}
	description={`Explore ${
		agency.name
	} agency housing ${agency.member.toLocaleString()} incredible talents cherished by ${compactInt(
		agency.subscriber
	)} fans. Discover their monthly member count insights and debut-to-retirement timelines for each member, unraveling the agency's journey in the virtual universe.`}
	image={getWikiImg(agency.image)}
/>

<div class="grid grid-cols-4 gap-4">
	<Breadcrumb class="col-span-4">
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/agencies">Agencies</BreadcrumbItem>
		<BreadcrumbItem>{agency.name}</BreadcrumbItem>
	</Breadcrumb>
	<h1 class="col-span-4">
		<a
			href="{PUBLIC_VTUBER_WIKI_HOST}/{agency.name}"
			target="_blank"
			rel="noreferrer"
			class="clickable"
		>
			{agency.name}
		</a>
	</h1>
	<div class="col-span-4 sm:col-span-1">
		<div class="sticky top-20 flex flex-col gap-4">
			<Card size="none" padding="none">
				<Image
					src={getWikiImg(agency.image, 0)}
					alt={agency.name}
					class="max-h-96 rounded-lg object-contain object-center p-4 sm:max-h-max"
					loadingClass="aspect-card"
					errorClass="aspect-card"
				/>
			</Card>
			<div class="flex items-center justify-between gap-2">
				<span class="font-bold">Member Count</span>
				<P>{agency.member.toLocaleString()}</P>
			</div>
			<div class="flex items-center justify-between gap-2">
				<span class="font-bold">Total Subscriber</span>
				<P>{compactInt(agency.subscriber)}</P>
				<Tooltip placement="bottom">{agency.subscriber.toLocaleString()}</Tooltip>
			</div>
		</div>
	</div>
	<div class="col-span-4 sm:col-span-3">
		<Tabs tabStyle="pill" contentClass="mt-2 sm:mt-4">
			<TabItem open>
				<div slot="title" class="flex items-center gap-2">
					<UsersIcon class="size-4" />
					Members
				</div>
				<Members {vtubers} />
			</TabItem>
			{#if vtubers.length > 0}
				<TabItem>
					<div slot="title" class="flex items-center gap-2">
						<CalendarIcon class="size-4" />
						Events
					</div>
					<Events {vtubers} />
				</TabItem>
			{/if}
		</Tabs>
	</div>
</div>
