<script lang="ts">
	import { getWikiImg, toURL } from '$lib/utils/utils';
	import { Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import Image from '../commons/Image.svelte';
	import RenderIfVisible from '../commons/RenderIfVisible.svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let delay: number = 0;

	export { className as class };
	let className: string = '';
</script>

<RenderIfVisible class={twMerge('aspect-square', className)}>
	<Card
		title={name}
		size="none"
		padding="none"
		href="/vtubers/{id}/{toURL(name)}"
		class="group relative h-full w-full transition hover:!border-primary-500"
	>
		<Image
			{delay}
			src={getWikiImg(image)}
			alt={name}
			class="h-full w-full rounded-lg object-cover object-top"
		/>
		<h4
			class="h5 pointer-events-none absolute bottom-0 line-clamp-1 w-full rounded-b-lg bg-primary-500 p-0.5 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
		>
			{name}
		</h4>
		<div class="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
			<slot name="badge" />
		</div>
	</Card>
</RenderIfVisible>
