<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getWikiImg } from '$lib/utils/utils';

	export let id: number;
	export let name: string;
	export let image: string;
	export { className as class };
	let className: string = '';
</script>

<a href="/agencies/{id}/{name}" class={className} title={name}>
	<RenderIfVisible
		class="group relative aspect-video rounded-lg bg-card shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<Image
			src={getWikiImg(image)}
			alt={name}
			class="h-full w-full rounded-lg object-contain object-center p-2"
		/>
		<div
			class="pointer-events-none absolute bottom-0 line-clamp-1 w-full bg-primary p-0.5 text-center font-bold text-white opacity-0 group-hover:opacity-100 dark:bg-primary-dark"
		>
			{name}
		</div>
	</RenderIfVisible>
</a>
