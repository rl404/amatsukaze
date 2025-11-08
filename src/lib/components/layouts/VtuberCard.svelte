<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getWikiImg, toURL } from '$lib/utils/utils';
	import { Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let id: number;
	export let name: string;
	export let image: string;
	export let agencies: string[];
	export let debutDate: Date | undefined;
	export let retirementDate: Date | undefined;
	export let delay: number = 0;
</script>

<RenderIfVisible class={twMerge('h-36', $$props.class)}>
	<Card
		title={name}
		href="/vtubers/{id}/{toURL(name)}"
		class="group relative flex size-full max-w-full flex-row overflow-hidden"
	>
		<Image
			{delay}
			src={getWikiImg(image)}
			alt={name}
			class="aspect-portrait h-full rounded-l-lg object-cover object-top"
		/>
		{#if image}
			<div
				class="aspect-portrait absolute top-1/2 right-0 h-60 -translate-y-1/2 opacity-15 dark:opacity-10"
			>
				<Image
					{delay}
					src={getWikiImg(image)}
					alt={name}
					class="aspect-portrait absolute top-0 right-0 h-full bg-none object-cover object-top"
				/>
				<div
					class="absolute top-0 right-0 size-full bg-gradient-to-r from-white to-transparent group-hover:from-gray-100 dark:from-gray-800 dark:group-hover:from-gray-700"
				/>
			</div>
		{/if}
		<div class="z-10 flex w-full flex-col gap-1 p-2">
			<div class="border-border border-b pb-1">
				<h4 class="h5 line-clamp-1">{name}</h4>
			</div>
			<div class="flex justify-between gap-1">
				<h5>Agency</h5>
				<div class="text-primary line-clamp-1 text-right" title={agencies && agencies.join(', ')}>
					{agencies.length === 0 ? '-' : agencies.join(', ')}
				</div>
			</div>
			<div class="flex justify-between gap-1">
				<h5>Debut</h5>
				<div class="text-primary line-clamp-1 text-right">
					{!debutDate ? '-' : debutDate.toISOString().slice(0, 10)}
				</div>
			</div>
			<div class="flex justify-between gap-1">
				<h5>Retired</h5>
				<div class="text-primary line-clamp-1 text-right">
					{!retirementDate ? '-' : retirementDate.toISOString().slice(0, 10)}
				</div>
			</div>
		</div>
	</Card>
</RenderIfVisible>
