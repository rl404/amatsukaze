<script lang="ts">
	import Model2DBadge from '$lib/components/badges/Model2DBadge.svelte';
	import Model3DBadge from '$lib/components/badges/Model3DBadge.svelte';
	import Border from '$lib/components/commons/Border.svelte';
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
		class="flex aspect-card items-center rounded-lg bg-card shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<Image
			src={getWikiImg(image)}
			alt={name}
			class="h-full w-1/3 rounded-l-lg border-y-2 border-l-2 border-card bg-body object-cover object-top dark:border-card-dark dark:bg-body-dark"
		/>
		<div class="flex h-full w-2/3 flex-col gap-2 p-2 sm:gap-1">
			<div>
				<div class="line-clamp-1 text-base font-bold" itemprop="name">{name}</div>
			</div>
			<Border class="h-3">
				{#if has2d || has3d}
					<div class="flex gap-1 px-1.5">
						{#if has2d}
							<Model2DBadge size="sm" />
						{/if}
						{#if has3d}
							<Model3DBadge size="sm" />
						{/if}
					</div>
				{/if}
			</Border>
			<div class="flex justify-between gap-1">
				<div class="subtitle">Agency</div>
				<div class="line-clamp-1 text-right" title={agencies && agencies.join(', ')}>
					{agencies.length === 0 ? '-' : agencies.join(', ')}
				</div>
			</div>
			<div class="flex justify-between gap-1">
				<div class="subtitle">Debut</div>
				<div class="text-right">
					{!debutDate ? '-' : debutDate.toISOString().slice(0, 10)}
				</div>
			</div>
			<div class="flex justify-between gap-1">
				<div class="subtitle">Retired</div>
				<div class="text-right">
					{!retirementDate ? '-' : retirementDate.toISOString().slice(0, 10)}
				</div>
			</div>
		</div>
	</RenderIfVisible>
</a>
