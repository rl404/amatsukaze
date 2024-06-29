<script lang="ts">
	import { compactInt, getWikiImg } from '$lib/utils/utils';
	import { Avatar, Card } from 'flowbite-svelte';
	import RenderIfVisible from '../commons/RenderIfVisible.svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let member: number;
	export let subscriber: number;

	export { className as class };
	let className: string;
</script>

<RenderIfVisible class={className}>
	<Card
		title={name}
		size="none"
		padding="xs"
		href="/agencies/{id}/{name}"
		class="grid grid-cols-10 items-center gap-2 text-center"
	>
		<div class="col-span-10 flex items-center gap-2 sm:col-span-6">
			<Avatar src={getWikiImg(image)} alt={name} size="none" class="size-7 object-cover" />
			<div class="line-clamp-1 text-left">
				<h5>{name}</h5>
			</div>
		</div>
		<div class="hidden sm:col-span-2 sm:block" title="agency members">
			{member.toLocaleString()} members
		</div>
		<div class="hidden sm:col-span-2 sm:block" title="total subscriber">
			{compactInt(subscriber)}
		</div>
	</Card>
</RenderIfVisible>
