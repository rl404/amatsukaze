<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { compactInt, getWikiImg } from '$lib/utils/utils';

	export let id: number;
	export let name: string;
	export let image: string;
	export let member: number;
	export let subscriber: number;
	export { className as class };

	let className: string;
</script>

<a href="/agencies/{id}/{name}" class={className} title={name}>
	<RenderIfVisible
		class="grid grid-cols-10 items-center gap-2 rounded-lg bg-card p-2 text-center shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
	>
		<div class="col-span-2">
			<Image src={getWikiImg(image)} alt={name} class="m-auto h-7 w-full object-cover" />
		</div>
		<div class="col-span-6 line-clamp-1 text-left font-bold sm:col-span-4">
			{name}
		</div>
		<div class="col-span-2 hidden sm:block" title="member count">
			{member.toLocaleString()} members
		</div>
		<div class="col-span-2" title="total subscriber">
			{compactInt(subscriber)}
		</div>
	</RenderIfVisible>
</a>
