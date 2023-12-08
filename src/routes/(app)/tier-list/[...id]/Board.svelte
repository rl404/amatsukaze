<script lang="ts">
	import type { Tier } from './+page.server';
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import VtuberGrid from './VtuberGrid.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import type { SvelteComponent } from 'svelte';
	import TierModal from './TierModal.svelte';

	export let data: Tier[] = [];
	export let editMode: boolean = false;

	let modal: SvelteComponent;

	const onTierMove = (e: CustomEvent<DndEvent<any>>) => {
		data = e.detail.items;
	};

	const onVtuberMove = (i: number, e: CustomEvent<DndEvent<any>>) => {
		data[i].vtubers = e.detail.items;
		data = [...data];
	};

	const onAdd = () => {
		modal.toggleOpen();
	};

	const onEdit = (i: number) => {
		modal.toggleOpen(i);
	};

	const onDelete = (i: number, j: number) => {
		data[i].vtubers = data[i].vtubers.filter((_, k) => k !== j);
		data = [...data];
	};
</script>

<div class="grid gap-4">
	<div class="grid" use:dndzone={{ items: data, type: 'tier', dropTargetStyle: { outline: '' } }} on:consider={onTierMove} on:finalize={onTierMove}>
		{#each data as d, i (d.id)}
			<div class="flex border border-neutral-200 dark:border-black gap-1 bg-neutral-100 dark:bg-neutral-800">
				<button
					class={`${d.color} ${d.size} w-24 min-h-[6rem] h-full font-bold items-center justify-center break-all p-1`}
					on:click={() => onEdit(i)}
				>
					{d.label}
				</button>
				<div
					class="flex flex-wrap gap-1 w-full"
					use:dndzone={{ items: d.vtubers, dropTargetStyle: { outline: '' } }}
					on:consider={(e) => onVtuberMove(i, e)}
					on:finalize={(e) => onVtuberMove(i, e)}
				>
					{#each d.vtubers as vtuber, j (vtuber.id)}
						<VtuberGrid
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							bind:description={vtuber.description}
							isShadowItem={vtuber[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
							class="w-24"
							{editMode}
							openModal={true}
							on:delete={() => onDelete(i, j)}
						/>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	{#if editMode}
		<Button on:click={onAdd}>
			<span class="text-center w-full">Add New Tier</span>
		</Button>
	{/if}
</div>

<TierModal bind:this={modal} bind:data {editMode} />
