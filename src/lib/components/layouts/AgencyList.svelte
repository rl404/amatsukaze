<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { compactInt, getWikiImg, toURL } from '$lib/utils/utils';
	import { Avatar, Card } from 'flowbite-svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let member: number;
	export let subscriber: number;
</script>

<RenderIfVisible class={$$props.class}>
	<Card
		title={name}
		href="/agencies/{id}/{toURL(name)}"
		class="relative grid max-w-full grid-cols-10 items-center gap-2 overflow-hidden p-2 text-center"
	>
		{#if image}
			<div
				class="absolute top-1/2 right-0 aspect-video w-60 -translate-y-1/2 opacity-15 dark:opacity-10"
			>
				<Image
					src={getWikiImg(image)}
					alt={name}
					class="absolute top-0 right-0 aspect-video h-full bg-none object-cover object-right"
				/>
				<div
					class="absolute top-0 right-0 size-full bg-gradient-to-r from-white to-transparent group-hover:from-gray-100 dark:from-gray-800 dark:group-hover:from-gray-700"
				/>
			</div>
		{/if}
		<div class="col-span-10 flex items-center gap-2 sm:col-span-6">
			<Avatar src={getWikiImg(image)} alt={name} class="size-7 object-cover" />
			<h4 class="h5 line-clamp-1 text-left">{name}</h4>
		</div>
		<h5 class="hidden sm:col-span-2 sm:block" title="agency members">
			{member.toLocaleString()} members
		</h5>
		<h5 class="hidden sm:col-span-2 sm:block" title="total subscriber">
			{compactInt(subscriber)}
		</h5>
	</Card>
</RenderIfVisible>
