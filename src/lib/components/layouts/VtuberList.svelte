<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import VtuberModal from '$lib/components/modals/VtuberModal.svelte';
	import Image from '../Image.svelte';
	import Model2DBadge from '../badges/Model2DBadge.svelte';
	import Model3DBadge from '../badges/Model3DBadge.svelte';

	export let id: number;
	export let name: string;
	export let image: string;
	export let has2d: boolean = false;
	export let has3d: boolean = false;
	export let agencies: Array<string> = [];
	export let debutDate: Date | undefined;
	export let retirementDate: Date | undefined;

	export let height: number;
	export { className as class };
	let className: string;

	let modal: SvelteComponent;
</script>

<div
	class="bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:outline hover:outline-pink-500 dark:hover:outline-indigo-600 shadow hover:shadow-lg {className}"
>
	<div class="grid grid-cols-9 cursor-pointer gap-2 p-2 text-center" on:click={() => modal.toggleOpen()}>
		<div class="col-span-9 md:col-span-3 text-lg text-left font-bold text-ellipsis whitespace-nowrap overflow-hidden flex gap-2" title={name}>
			<Image
				src={image && `/api/wikia/image/${image.split('?')[0]}?height=${height}`}
				alt={name}
				class="h-7 w-7 object-cover object-top rounded-full bg-white shadow-lg"
			/><span>{name}</span>
		</div>
		<div class="col-span-3 md:col-span-2 text-sm md:text-base" title="agencies">{agencies.length === 0 ? '-' : agencies.join(', ')}</div>
		<div class="col-span-2 md:col-span-1 text-sm md:text-base" title="debut date">{!debutDate ? '-' : debutDate.toString().slice(0, 10)}</div>
		<div class="col-span-2 md:col-span-1 text-sm md:text-base" title="retirement date">
			{!retirementDate ? '-' : retirementDate.toString().slice(0, 10)}
		</div>
		<div class="text-sm md:text-base">
			{#if has2d}
				<Model2DBadge size="sm" />
			{/if}
		</div>
		<div class="text-sm md:text-base">
			{#if has3d}
				<Model3DBadge size="sm" />
			{/if}
		</div>
	</div>
	<VtuberModal {id} title={name} bind:this={modal} />
</div>
