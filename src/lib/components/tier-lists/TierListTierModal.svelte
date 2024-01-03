<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import InputTextarea from '$lib/components/inputs/InputTextarea.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { Tier } from '$lib/types';
	import { TierColors, TierSize } from '$lib/utils/const';
	import { quickRandomStr } from '$lib/utils/utils';
	import type { SvelteComponent } from 'svelte';

	export let data: Tier[];

	let tierIndex: number;
	let label: string;
	let description: string;
	let color: string;
	let size: string;
	let modal: SvelteComponent;

	export const toggleOpen = (i: number) => {
		if (i === -1) {
			tierIndex = -1;
			label = '';
			description = '';
			color = TierColors[0];
			size = TierSize[3];
		} else {
			tierIndex = i;
			label = data[i].label;
			description = data[i].description;
			color = data[i].color;
			size = data[i].size;
		}
		modal.toggleOpen();
	};

	export const onSave = () => {
		if (tierIndex === -1) {
			data = [
				...data,
				{
					id: quickRandomStr(),
					label: label,
					description: description,
					color: color,
					size: size,
					vtubers: []
				}
			];
		} else {
			data[tierIndex].label = label;
			data[tierIndex].description = description;
			data[tierIndex].color = color;
			data[tierIndex].size = size;
		}
		modal.toggleOpen();
	};

	const onSizeClick = (v: string) => (size = v);
	const onColorClick = (v: string) => (color = v);
</script>

<Modal bind:this={modal} class="max-w-2xl">
	<div slot="header" class="text-xl font-bold">Tier</div>

	<div slot="body" class="grid grid-cols-4 items-center gap-4 p-4">
		<label for="label" class="col-span-4 font-bold sm:col-span-1 sm:text-right">Label</label>
		<div class="col-span-4 sm:col-span-3">
			<InputText id="label" class="w-full" bind:value={label} placeholder="tier label" />
		</div>
		<label for="description" class="col-span-4 font-bold sm:col-span-1 sm:text-right"
			>Description</label
		>
		<div class="col-span-4 sm:col-span-3">
			<InputTextarea
				id="description"
				class="w-full"
				bind:value={description}
				placeholder="tier description..."
			/>
		</div>
		<div class="col-span-4 font-bold sm:col-span-1 sm:text-right">Size</div>
		<div class="col-span-4 flex flex-wrap items-center gap-4 sm:col-span-3">
			{#each TierSize as tierSize}
				<button
					class="{tierSize} {color} {tierSize === size &&
						'outline outline-4 outline-primary dark:outline-primary-dark'} min-h-24 w-24 break-all p-1 font-bold"
					on:click={() => onSizeClick(tierSize)}
				>
					{label || 'Abcde'}
				</button>
			{/each}
		</div>
		<div class="col-span-4 font-bold sm:col-span-1 sm:text-right">Color</div>
		<div class="col-span-4 flex flex-wrap items-center gap-4 sm:col-span-3">
			{#each TierColors as tierColor}
				<button
					class="{tierColor} {tierColor === color &&
						'outline outline-4 outline-primary dark:outline-primary-dark'} h-6 w-6 rounded-full"
					on:click={() => onColorClick(tierColor)}
				/>
			{/each}
		</div>
	</div>

	<div slot="footer" class="flex items-center justify-end p-4">
		<Button color class="p-2 px-4 font-medium" on:click={onSave}>Save</Button>
	</div>
</Modal>
