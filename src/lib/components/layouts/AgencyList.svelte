<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { compactInt, getWikiImg, toURL } from '$lib/utils/utils';
	import { Avatar, Card } from 'flowbite-svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let member: number;
	export let subscriber: number;
</script>

<RenderIfVisible class={$$props.class}>
	<Card
		title={name}
		href="/agencies/{id}/{toURL(name)}"
		class="grid max-w-full grid-cols-10 items-center gap-2 p-2 text-center"
	>
		<div class="col-span-10 flex items-center gap-2 sm:col-span-6">
			<Avatar src={getWikiImg(image)} alt={name} class="size-7 object-cover" />
			<h4 class="h5 line-clamp-1 text-left">{name}</h4>
		</div>
		<h5 class="hidden sm:col-span-2 sm:block" title="agency members">
			{member.toLocaleString()} members
		</h5>
		<h5 class="hidden sm:col-span-2 sm:block" title="total subscriber">
			{compactInt(subscriber)}
		</h5>
	</Card>
</RenderIfVisible>
