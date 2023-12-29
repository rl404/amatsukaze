<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import { getWikiImg } from '$lib/utils/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ click: null; delete: null }>();

	export let name: string;
	export let image: string;
	export let isShadowItem: boolean | undefined = false;
	export let deletable: boolean = true;
	export { className as class };

	let className: string = '';

	const onClick = () => dispatch('click');
	const onDelete = () => dispatch('delete');
</script>

<button class={className} on:click={onClick}>
	<RenderIfVisible
		class="{isShadowItem &&
			'opacity-70'} group relative aspect-square rounded-lg bg-card shadow hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
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
		{#if deletable}
			<IconButton
				class="absolute right-1 top-1 bg-card p-0.5 opacity-0 shadow-lg group-hover:opacity-100 dark:bg-card-dark"
				title="delete"
				on:click={onDelete}
			>
				<XmarkIcon class="h-4 w-4" />
			</IconButton>
		{/if}
		{#if isShadowItem}
			<div
				class="visible absolute bottom-0 left-0 right-0 top-0 aspect-square rounded-lg bg-card opacity-30 dark:bg-card-dark"
			>
				<Image
					src={getWikiImg(image)}
					alt={name}
					class="h-full w-full rounded-lg object-cover object-top"
				/>
			</div>
		{/if}
	</RenderIfVisible>
</button>
