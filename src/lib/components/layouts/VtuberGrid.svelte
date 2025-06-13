<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getWikiImg, toURL } from '$lib/utils/utils';
	import { Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let id: number;
	export let name: string;
	export let image: string;
	export let delay: number = 0;
</script>

<RenderIfVisible class={twMerge('aspect-square', $$props.class)}>
	<Card
		title={name}
		href="/vtubers/{id}/{toURL(name)}"
		class="hover:border-primary-500 group relative size-full transition"
	>
		<Image
			{delay}
			src={getWikiImg(image)}
			alt={name}
			class="size-full rounded-lg object-cover object-top"
		/>
		<h5
			class="h5 bg-primary-500 absolute bottom-0 line-clamp-1 w-full rounded-b-lg p-0.5 text-center text-white opacity-0 transition group-hover:opacity-100"
		>
			{name}
		</h5>
		<div class="absolute top-1 right-1 opacity-0 transition group-hover:opacity-100">
			<slot name="badge" />
		</div>
	</Card>
</RenderIfVisible>
