<script lang="ts">
	import Model2DBadge from '$lib/components/badges/Model2DBadge.svelte';
	import Model3DBadge from '$lib/components/badges/Model3DBadge.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getWikiImg } from '$lib/utils/utils';

	export let id: number;
	export let name: string;
	export let image: string;
	export let has2d: boolean;
	export let has3d: boolean;
	export let agencies: string[];
	export let debutDate: Date | undefined;
	export let retirementDate: Date | undefined;
	export let itemprop: string = '';
	export { className as class };

	let className: string;
</script>

<a
	href="/vtubers/{id}/{name}"
	class={className}
	title={name}
	{itemprop}
	itemscope
	itemtype="https://schema.org/Person"
>
	<RenderIfVisible
		class="grid grid-cols-10 items-center gap-2 rounded-lg bg-card p-2 text-center shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<div class="col-span-10 flex items-center gap-2 sm:col-span-5 lg:col-span-3">
			<Image
				src={getWikiImg(image)}
				alt={name}
				class="h-7 w-7 rounded-full bg-body object-cover object-top dark:bg-body-dark"
			/>
			<span class="line-clamp-1 font-bold" itemprop="name">{name}</span>
		</div>
		<div
			class="col-span-5 hidden text-right sm:line-clamp-1 md:col-span-3 md:text-center lg:col-span-2"
			title={agencies && agencies.join(', ')}
		>
			{agencies.length === 0 ? '-' : agencies.join(', ')}
		</div>
		<div class="col-span-2 hidden lg:block">
			{!debutDate ? '-' : debutDate.toISOString().slice(0, 10)}
		</div>
		<div class="col-span-2 hidden lg:block">
			{!retirementDate ? '-' : retirementDate.toISOString().slice(0, 10)}
		</div>
		<div class="col-span-2 hidden items-center justify-center gap-1 md:flex lg:col-span-1">
			{#if has2d}
				<Model2DBadge size="sm" />
			{/if}
			{#if has3d}
				<Model3DBadge size="sm" />
			{/if}
		</div>
	</RenderIfVisible>
</a>
