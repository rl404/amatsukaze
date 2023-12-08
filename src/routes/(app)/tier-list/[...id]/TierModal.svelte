<script lang="ts">
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { Tier } from './+page.server';
	import Button from '$lib/components/buttons/Button.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import { TierColors, TierSize } from '$lib/utils';
	import InputTextArea from '$lib/components/inputs/InputTextArea.svelte';

	export let data: Tier[];
	export let editMode: boolean = false;

	let index: number;
	let modal: SvelteComponent;
	let tier: Tier = { id: '', label: '', description: '', color: '', size: '', vtubers: [] };

	export const toggleOpen = (i: number = -1) => {
		index = i;
		if (i === -1) {
			tier = {
				id: 'tier' + data.length,
				label: '',
				description: '',
				color: TierColors[0],
				size: TierSize[TierSize.length - 1],
				vtubers: []
			};
		} else {
			tier = { ...data[i] };
		}

		modal.toggleOpen();
	};

	const onSizeClick = (v: string) => {
		tier.size = v;
	};

	const onColorClick = (v: string) => {
		tier.color = v;
	};

	const onSubmit = () => {
		if (index === -1) {
			data = [...data, tier];
		} else {
			data = data.map((t, i) => (i !== index ? t : tier));
		}
		modal.toggleOpen();
	};

	const onClose = () => {
		modal.toggleOpen();
	};
</script>

<Modal bind:this={modal} maxWidthClass="max-w-3xl">
	<div slot="title">Tier</div>

	<div slot="body" class="p-4 grid gap-4">
		<div class="grid grid-cols-6 items-center gap-2">
			<div class="col-span-6 sm:col-span-1 sm:text-right">
				<label for="label" class="font-medium">Label</label>
			</div>
			<div class="col-span-6 sm:col-span-5">
				{#if editMode}
					<InputText id="label" class="w-full" bind:value={tier.label} placeholder="LABEL" />
				{:else}
					{tier.label || '-'}
				{/if}
			</div>
		</div>
		<div class="grid grid-cols-6 items-center gap-2">
			<div class="col-span-6 sm:col-span-1 sm:text-right">
				<label for="description" class="font-medium">Description</label>
			</div>
			<div class="col-span-6 sm:col-span-5 whitespace-pre">
				{#if editMode}
					<InputTextArea id="description" class="w-full" bind:value={tier.description} placeholder="Description" />
				{:else}
					{tier.description || '-'}
				{/if}
			</div>
		</div>
		{#if editMode}
			<div class="grid grid-cols-6 items-center gap-2">
				<div class="col-span-6 sm:col-span-1 sm:text-right">
					<label for="size" class="font-medium">Size</label>
				</div>
				<div class="col-span-6 sm:col-span-5 flex flex-wrap items-center gap-4">
					{#each TierSize as tierSize}
						<button
							class="{tierSize} {tierSize === tier.size && 'outline outline-4 outline-black'} {tier.color} p-1 font-bold w-24 h-24"
							on:click={() => onSizeClick(tierSize)}>{tier.label || 'Abcde'}</button
						>
					{/each}
				</div>
			</div>
			<div class="grid grid-cols-6 items-center gap-2">
				<div class="col-span-6 sm:col-span-1 sm:text-right">
					<label for="color" class="font-medium">Color</label>
				</div>
				<div class="col-span-6 sm:col-span-5 flex flex-wrap items-center gap-4">
					{#each TierColors as tierColor}
						<button
							class="{tierColor} {tierColor === tier.color && 'outline outline-4 outline-black'} h-6 w-6 rounded-full"
							on:click={() => onColorClick(tierColor)}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div slot="footer" class="bg-white dark:bg-neutral-700 py-2 px-4 border-t dark:border-neutral-600 flex justify-end gap-2">
		{#if editMode}
			<Button on:click={onSubmit} color>Submit</Button>
			<Button on:click={onClose}>Cancel</Button>
		{/if}
	</div>
</Modal>
