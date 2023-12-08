<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import InputTextArea from '$lib/components/inputs/InputTextArea.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { SvelteComponent } from 'svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let description: string;
	export let editMode: boolean = false;

	let modal: SvelteComponent;

	export const toggleOpen = () => {
		modal.toggleOpen();
	};
</script>

<Modal bind:this={modal} maxWidthClass="max-w-2xl">
	<div slot="title"><a href="/vtubers/{id}" target="_blank">{name}</a></div>

	<div slot="body" class="p-4 grid grid-cols-4 gap-4">
		<div>
			<Image src={image && `/api/wikia/image/${image.split('?')[0]}?height=96`} alt={name} class="h-full w-full object-cover object-top rounded-lg" />
		</div>
		<div class="col-span-3 flex flex-col gap-1">
			<div class="font-medium">Description</div>
			<div class=" whitespace-pre">
				{#if editMode}
					<InputTextArea class="w-full" bind:value={description} placeholder="Description" />
				{:else}
					{description || '-'}
				{/if}
			</div>
		</div>
	</div></Modal
>
