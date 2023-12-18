<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getWikiImg } from '$lib/utils/utils';

	export let id: number;
	export let name: string;
	export let image: string;
	export { className as class };
	export let itemprop: string = '';
	export let dir: string = 'ltr';

	let className: string = '';
</script>

<a
	href="/vtubers/{id}/{name}"
	class={className}
	{dir}
	title={name}
	{itemprop}
	itemscope
	itemtype="https://schema.org/Person"
>
	<RenderIfVisible
		class="group relative aspect-square rounded-lg bg-card shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<Image
			src={getWikiImg(image)}
			alt={name}
			class="h-full w-full rounded-lg object-cover object-top"
		/>
		<div
			itemprop="name"
			class="pointer-events-none absolute bottom-0 line-clamp-1 w-full bg-primary p-0.5 text-center font-bold text-white opacity-0 group-hover:opacity-100 dark:bg-primary-dark"
		>
			{name}
		</div>
	</RenderIfVisible>
</a>
