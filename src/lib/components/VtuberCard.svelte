<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import VtuberModal from '$lib/components/VtuberModal.svelte';
	import Border from './Border.svelte';
	import Image from './Image.svelte';
	import Model2DBadge from './Model2DBadge.svelte';
	import Model3DBadge from './Model3DBadge.svelte';

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

	let rows = [
		{ name: 'Agency', value: agencies.length === 0 ? '-' : agencies.join(', ') },
		{ name: 'Debut', value: !debutDate ? '-' : debutDate.toString().slice(0, 10) },
		{ name: 'Retired', value: !retirementDate ? '-' : retirementDate.toString().slice(0, 10) }
	];
</script>

<div
	class="bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:outline hover:outline-pink-500 dark:hover:outline-indigo-600 shadow hover:shadow-lg {className}"
>
	<div class="flex items-center cursor-pointer" style="aspect-ratio: 2/1;" on:click={() => modal.toggleOpen()}>
		<Image
			src={image && `/api/wikia/image/${image.split('?')[0]}?height=${height}`}
			alt={name}
			class="h-full w-1/3 object-cover object-top rounded-tl-lg bg-white shadow-lg"
		/>
		<div class="h-full w-2/3 p-2 flex flex-col gap-1 overflow-hidden">
			<div>
				<div class="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden" title={name}>{name}</div>
			</div>
			<Border class="h-3">
				{#if has2d || has3d}
					<div class="flex gap-1 px-1.5">
						{#if has2d}
							<div><Model2DBadge size="sm" /></div>
						{/if}
						{#if has3d}
							<div><Model3DBadge size="sm" /></div>
						{/if}
					</div>
				{/if}
			</Border>
			{#each rows as row}
				<div class="flex justify-between gap-1">
					<span class="opacity-40">{row.name}</span>
					<span class="text-right">{row.value}</span>
				</div>
			{/each}
		</div>
	</div>
	<VtuberModal {id} title={name} bind:this={modal} />
</div>
