<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getVideoCountColor, getWikiImg } from '$lib/utils/utils';

	export let id: number;
	export let name: string;
	export let image: string;
	export let label: string = '';
	export let videoCount: number = 0;
	export let retirementDate: string = '';
	export { className as class };
	export let showBorder: boolean = false;
	export let itemprop: string = '';

	let className: string = '';
</script>

<a
	href="/vtubers/{id}/{name}"
	class={className}
	title={name}
	{itemprop}
	itemscope
	itemtype="https://schema.org/Person"
>
	<meta itemprop="identifier" content={id.toString()} />
	<meta itemprop="name" content={name} />
	<meta itemprop="image" content={getWikiImg(image)} />
	<RenderIfVisible
		class="{showBorder &&
			getVideoCountColor(videoCount, retirementDate)
				.borderClass} group relative aspect-square rounded-lg bg-card shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<Image
			src={getWikiImg(image)}
			alt={name}
			class="h-full w-full rounded-lg object-cover object-top"
		/>
		<div
			class="pointer-events-none absolute bottom-0 line-clamp-1 w-full bg-primary p-0.5 text-center font-bold text-white opacity-0 group-hover:opacity-100 dark:bg-primary-dark"
		>
			{name}
		</div>
		{#if label !== '' && label !== '0'}
			<div
				class="absolute right-1 top-1 line-clamp-1 rounded-lg bg-primary px-1 text-xs font-bold text-white opacity-0 group-hover:opacity-100 dark:bg-primary-dark"
			>
				{label}
			</div>
		{/if}
	</RenderIfVisible>
</a>
