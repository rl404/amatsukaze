<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import RenderIfVisible from '$lib/components/RenderIfVisible.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import { SvelteComponent, createEventDispatcher } from 'svelte';
	import VtuberEditModal from './VtuberEditModal.svelte';

	const dispatch = createEventDispatcher<{ click: null; delete: null }>();

	export let id: number;
	export let name: string;
	export let image: string;
	export let description: string = '';
	export let editMode: boolean = false;
	export let isShadowItem: boolean | undefined = false;
	export let openModal: boolean = false;
	export { className as class };
	let className: string = '';

	let modal: SvelteComponent;

	const onClick = () => {
		if (openModal) {
			modal.toggleOpen();
		}
		dispatch('click');
	};

	const onDelete = () => dispatch('delete');
</script>

<div>
	<RenderIfVisible
		class="{className} {isShadowItem &&
			'opacity-70'} relative aspect-square group rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:outline hover:outline-pink-500 dark:hover:outline-indigo-600 drop-shadow hover:drop-shadow-lg cursor-pointer"
		on:click={onClick}
	>
		<Image src={image && `/api/wikia/image/${image.split('?')[0]}?height=96`} alt={name} class="h-full w-full object-cover object-top rounded-lg" />
		<div
			class="text-sm absolute bottom-0 w-full font-bold text-white text-center opacity-0 group-hover:opacity-100 bg-pink-500 dark:bg-indigo-600 p-0.5 text-ellipsis whitespace-nowrap overflow-hidden pointer-events-none"
		>
			{name}
		</div>
		{#if editMode}
			<IconButton class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-600" on:click={onDelete}>
				<XmarkIcon class="w-3 h-3" />
			</IconButton>
		{/if}
		{#if isShadowItem}
			<div class="visible absolute rounded-lg top-0 bottom-0 left-0 right-0 aspect-square bg-neutral-100 dark:bg-neutral-800 opacity-30">
				<Image
					src={image && `/api/wikia/image/${image.split('?')[0]}?height=96`}
					alt={name}
					class="h-full w-full object-cover object-top rounded-lg"
				/>
			</div>
		{/if}
	</RenderIfVisible>

	<VtuberEditModal bind:this={modal} {id} {name} {image} bind:description {editMode} />
</div>
