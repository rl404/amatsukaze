<script lang="ts">
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import type { Tier, TierVtuber } from './+page.server';
	import type { SvelteComponent } from 'svelte';
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import VtuberAddModal from './VtuberAddModal.svelte';
	import VtuberGrid from './VtuberGrid.svelte';

	export let data: Tier[];
	export let editMode: boolean = false;
	export let agencies: Array<string>;
	export let vtubers: TierVtuber[] = [];

	let modal: SvelteComponent;

	const openModal = () => {
		modal.toggleOpen();
	};

	const addVtuber = (vtuber: TierVtuber) => {
		vtubers = [...vtubers, vtuber];
	};

	const onMove = (e: CustomEvent<DndEvent<any>>) => {
		vtubers = e.detail.items;
	};

	const onDelete = (i: number) => {
		vtubers = vtubers.filter((_, j) => j !== i);
	};
</script>

<div
	class="flex flex-wrap gap-1 min-h-[6rem]"
	use:dndzone={{ items: vtubers, dropTargetStyle: { outline: '' } }}
	on:consider={onMove}
	on:finalize={onMove}
>
	{#each vtubers as vtuber, i (vtuber.id)}
		<VtuberGrid
			id={vtuber.id}
			name={vtuber.name}
			image={vtuber.image}
			bind:description={vtuber.description}
			isShadowItem={vtuber[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
			class="w-24"
			{editMode}
			openModal={true}
			on:delete={() => onDelete(i)}
		/>
	{/each}
	{#if editMode}
		<button
			class="w-24 aspect-square group bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:outline hover:outline-pink-500 dark:hover:outline-indigo-600 drop-shadow hover:drop-shadow-lg cursor-pointer flex items-center justify-center"
			title="add new vtuber"
			on:click={openModal}
			on:mousedown={(e) => e.stopImmediatePropagation()}
			on:touchstart={(e) => e.stopImmediatePropagation()}
		>
			<PlusIcon class="w-6 h-6" />
		</button>
	{/if}
</div>

<VtuberAddModal bind:this={modal} addedVtubers={[...data.map((d) => d.vtubers).flat(), ...vtubers]} {agencies} onAddVtuber={addVtuber} />
