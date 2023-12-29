<script lang="ts">
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import type { TierVtuber } from '$lib/types';
	import type { SvelteComponent } from 'svelte';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import type { TierListResponseData } from '../../../routes/(app)/tier-lists/[id]/[...title]/+page.server';
	import TierListGrid from './TierListGrid.svelte';
	import TierListVtuberAddModal from './TierListVtuberAddModal.svelte';

	export let data: TierListResponseData;

	let modal: SvelteComponent;
	let optionData: TierVtuber[] = data.options.map((d) => ({
		...d,
		isDndShadowItem: false
	}));

	$: data.options = optionData;

	const onMove = (e: CustomEvent<DndEvent<any>>) => (optionData = e.detail.items);
	const onDelete = (i: number) => (optionData = optionData.filter((_, j) => i !== j));
	const openModal = () => modal.toggleOpen();
</script>

<div
	class="min-h-24 flex flex-wrap gap-1"
	use:dndzone={{ items: optionData, dropTargetStyle: { outline: '' } }}
	on:consider={onMove}
	on:finalize={onMove}
>
	{#each optionData as vtuber, i (vtuber.id)}
		<TierListGrid
			name={vtuber.name}
			image={vtuber.image}
			isShadowItem={vtuber[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
			class="w-24 text-sm"
			on:delete={() => onDelete(i)}
		/>
	{/each}
	<button
		class="flex aspect-square w-24 !cursor-pointer items-center justify-center rounded-lg bg-card hover:outline hover:outline-primary dark:bg-card-dark dark:hover:outline-primary-dark"
		title="add new vtuber"
		on:click={openModal}
		on:mousedown={(e) => e.stopImmediatePropagation()}
		on:touchstart={(e) => e.stopImmediatePropagation()}
	>
		<PlusIcon class="h-6 w-6" />
	</button>
</div>

<TierListVtuberAddModal
	bind:this={modal}
	bind:data={optionData}
	addedVtubers={[...data.options, ...data.tiers.map((d) => d.vtubers).flat()]}
/>
