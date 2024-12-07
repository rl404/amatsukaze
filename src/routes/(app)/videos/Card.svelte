<script lang="ts">
	import VideoGrid from '$lib/components/layouts/VideoGrid.svelte';
	import { Badge, Button, Card } from 'flowbite-svelte';
	import type { VideosResponse } from '../../api/videos/+server';

	export let title: string;
	export let link: string;
	export let data: VideosResponse;
</script>

<Card size="none" class="gap-4">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			<h2 class="h2 border-l-4 border-primary-500 pl-2">{title}</h2>
			<Badge large>{data.meta.total.toLocaleString()}</Badge>
		</div>
		<Button href={link} size="xs">MORE</Button>
	</div>
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
		{#each data.data as video}
			<VideoGrid data={video} />
		{/each}
	</div>
</Card>
