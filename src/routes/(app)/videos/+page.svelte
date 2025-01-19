<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import { Breadcrumb, BreadcrumbItem, Tooltip } from 'flowbite-svelte';
	import type { VideosPageResponse } from './+page.server';
	import Card from './Card.svelte';

	export let data: VideosPageResponse;
</script>

<Head
	title="Stream & Video List"
	description="Discover who is live streaming right now, prepare the upcoming streams, and catch up missed streams."
	image="/videos.png"
/>

<div class="grid gap-4 overflow-hidden">
	<Breadcrumb>
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Videos</BreadcrumbItem>
	</Breadcrumb>
	<div class="relative flex items-center">
		<TextOutline class="absolute -z-10 opacity-20">Streams & Videos</TextOutline>
		<div class="flex items-center gap-4">
			<h1 class="h1 flex items-center gap-4">Streams & Videos</h1>
			<InfoIcon class="hidden size-5 sm:block" />
			<Tooltip placement="right">
				Data may not be accurate since the data are only updated once per day.
			</Tooltip>
		</div>
	</div>
	<Card title="Live" link="/videos/live" data={data.live} />
	<Card title="Upcoming" link="/videos/upcoming" data={data.upcoming} />
	<Card title="Recent" link="/videos/recent" data={data.recent} />
</div>
