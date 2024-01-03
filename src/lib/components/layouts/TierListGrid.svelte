<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { getWikiImg } from '$lib/utils/utils';
	import type {
		TierListResponseData,
		TierListResponseDataVtuber
	} from '../../../routes/(app)/tier-lists/[id]/[...title]/+page.server';

	export let data: TierListResponseData;
	export { className as class };

	let className: string = '';
	let image: string = '';
	let vtubers: TierListResponseDataVtuber[] = [];
	let vtuberCount: number = 0;

	$: vtubers = [...data.tiers.map((d) => d.vtubers).flat(), ...data.options];
	$: vtuberCount = vtubers.length;
	$: image = vtuberCount > 0 ? vtubers[0].image : '';
</script>

<a href="/tier-lists/{data.id}/{data.title}" class={className} title={data.title}>
	<RenderIfVisible
		class="relative aspect-card rounded-lg bg-card shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<Image
			src={getWikiImg(image)}
			alt={data.title}
			class="absolute left-0 top-0 h-full w-full object-cover opacity-10"
		/>
		<div class="absolute left-0 top-0 grid h-full w-full grid-rows-3 gap-2 p-4">
			<div class="row-span-2 flex items-center justify-center text-center text-xl font-bold">
				<div class="line-clamp-2">{data.title}</div>
			</div>
			<div class="subtitle text-center">
				<div class="line-clamp-1">
					{data.user.username} • {vtuberCount.toLocaleString()} vtubers
				</div>
			</div>
		</div>
	</RenderIfVisible>
</a>
