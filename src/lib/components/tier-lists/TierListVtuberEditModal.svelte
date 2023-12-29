<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import InputTextarea from '$lib/components/inputs/InputTextarea.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { Tier, TierVtuber } from '$lib/types';
	import { getWikiImg } from '$lib/utils/utils';
	import type { SvelteComponent } from 'svelte';

	export let data: Tier[];

	let vtuber: TierVtuber;
	let description: string;
	let modal: SvelteComponent;

	export const toggleOpen = (i: number, j: number) => {
		vtuber = data[i].vtubers[j];
		description = vtuber.description;
		modal.toggleOpen();
	};

	const onSave = () => {
		vtuber.description = description;
		modal.toggleOpen();
	};
</script>

<Modal bind:this={modal} class="max-w-2xl">
	<div slot="header" class="text-xl font-bold">
		<a href="/vtubers/{vtuber.id}/{vtuber.name}" target="_blank" class="clickable">{vtuber.name}</a>
	</div>

	<div slot="body" class="grid grid-cols-4 gap-4 p-4">
		<Image
			src={getWikiImg(vtuber.image)}
			alt={vtuber.name}
			class="w-full rounded-lg border border-border bg-card dark:border-border-dark dark:bg-card-dark"
		/>
		<div class="col-span-3 flex flex-col gap-1">
			<label for="description" class="font-bold">Description</label>
			<InputTextarea
				id="description"
				bind:value={description}
				placeholder="describe why this vtuber is in this tier..."
			/>
		</div>
	</div>

	<div slot="footer" class="flex items-center justify-end p-4">
		<Button color class="p-2 px-4 font-medium" on:click={onSave}>Save</Button>
	</div>
</Modal>
