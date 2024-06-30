<script lang="ts">
	import { getWikiImg } from '$lib/utils/utils';
	import { Avatar, Badge, Card, Tooltip } from 'flowbite-svelte';
	import RenderIfVisible from '../commons/RenderIfVisible.svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let has2d: boolean;
	export let has3d: boolean;
	export let agencies: string[];
	export let debutDate: Date | undefined;
	export let retirementDate: Date | undefined;
	export { className as class };

	let className: string;
</script>

<RenderIfVisible class={className}>
	<Card
		title={name}
		size="none"
		padding="xs"
		href="/vtubers/{id}/{name}"
		class="grid grid-cols-10 items-center gap-2 text-center"
	>
		<div class="col-span-10 flex items-center gap-2 sm:col-span-5 md:col-span-3">
			<Avatar
				src={getWikiImg(image)}
				alt={name}
				size="none"
				class="size-7 object-cover object-top"
			/>
			<h4 class="h5 line-clamp-1 text-left">{name}</h4>
		</div>
		<div
			class="col-span-5 hidden text-right sm:line-clamp-1 md:col-span-3 md:text-center xl:col-span-2"
			title={agencies && agencies.join(', ')}
		>
			{agencies.length === 0 ? '-' : agencies.join(', ')}
		</div>
		<div class="col-span-2 hidden md:block" title="debut date">
			{!debutDate ? '-' : debutDate.toISOString().slice(0, 10)}
		</div>
		<div class="col-span-2 hidden md:block" title="retirement date">
			{!retirementDate ? '-' : retirementDate.toISOString().slice(0, 10)}
		</div>
		<div class="hidden items-center justify-center gap-1 xl:flex">
			{#if has2d}
				<Badge color="pink">2D</Badge>
				<Tooltip>has 2D model</Tooltip>
			{/if}
			{#if has3d}
				<Badge color="indigo">3D</Badge>
				<Tooltip>has 3D model</Tooltip>
			{/if}
		</div>
	</Card>
</RenderIfVisible>
