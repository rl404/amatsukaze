<script lang="ts">
	import { getWikiImg } from '$lib/utils/utils';
	import { Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import Image from '../commons/Image.svelte';
	import RenderIfVisible from '../commons/RenderIfVisible.svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let agencies: string[];
	export let debutDate: Date | undefined;
	export let retirementDate: Date | undefined;
	export let delay: number = 0;
	export { className as class };

	let className: string;
</script>

<RenderIfVisible class={twMerge('h-36', className)}>
	<Card
		title={name}
		size="none"
		padding="none"
		href="/vtubers/{id}/{name}"
		class="flex h-full w-full flex-row overflow-hidden"
	>
		<Image
			{delay}
			src={getWikiImg(image)}
			alt={name}
			class="aspect-portrait h-full rounded-l-lg object-cover object-top"
		/>
		<div class="flex w-full flex-col gap-1 p-2">
			<div class="border-b border-border pb-1">
				<h4 class="h5 line-clamp-1">{name}</h4>
			</div>
			<div class="flex justify-between gap-1">
				<h5>Agency</h5>
				<div class="line-clamp-1 text-right text-primary" title={agencies && agencies.join(', ')}>
					{agencies.length === 0 ? '-' : agencies.join(', ')}
				</div>
			</div>
			<div class="flex justify-between gap-1">
				<h5>Debut</h5>
				<div class="line-clamp-1 text-right text-primary">
					{!debutDate ? '-' : debutDate.toISOString().slice(0, 10)}
				</div>
			</div>
			<div class="flex justify-between gap-1">
				<h5>Retired</h5>
				<div class="line-clamp-1 text-right text-primary">
					{!retirementDate ? '-' : retirementDate.toISOString().slice(0, 10)}
				</div>
			</div>
		</div>
	</Card>
</RenderIfVisible>
