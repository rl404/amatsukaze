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
</script>

<RenderIfVisible class={twMerge('aspect-video', $$props.class)}>
	<Card
		title={name}
		size="none"
		padding="none"
		href="/agencies/{id}/{toURL(name)}"
		class="group hover:!border-primary-500 relative h-full w-full transition"
	>
		<Image
			{delay}
			src={getWikiImg(image)}
			alt={name}
			class="h-full w-full rounded-lg object-cover object-center group-hover:object-contain group-hover:p-2"
		/>
		<h4
			class="h5 bg-primary-500 pointer-events-none absolute bottom-0 line-clamp-1 w-full rounded-b-lg p-0.5 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
		>
			{name}
		</h4>
		<div class="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100">
			<slot name="badge" />
		</div>
	</Card>
</RenderIfVisible>
