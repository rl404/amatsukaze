<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import type { Tier } from '$lib/types';
	import { quickRandomStr } from '$lib/utils/utils';
	import type { SvelteComponent } from 'svelte';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import type { TierListResponseDataTier } from '../../../routes/(app)/tier-lists/[id]/[...title]/+page.server';
	import TierListGrid from './TierListGrid.svelte';
	import TierListTierModal from './TierListTierModal.svelte';
	import TierListVtuberEditModal from './TierListVtuberEditModal.svelte';

	export let data: TierListResponseDataTier[];

	let tierModal: SvelteComponent;
	let vtuberModal: SvelteComponent;

	let tierData: Tier[] = data.map((d) => ({
		...d,
		id: quickRandomStr(),
		vtubers: d.vtubers.map((vtuber) => ({
			...vtuber,
			isDndShadowItem: false
		}))
	}));

	$: data = tierData;

	const onTierMove = (e: CustomEvent<DndEvent<any>>) => (tierData = e.detail.items);
	const onTierClick = (i: number) => tierModal.toggleOpen(i);
	const onTierDelete = (i: number) => (tierData = tierData.filter((_, j) => j !== i));

	const onVtuberMove = (i: number, e: CustomEvent<DndEvent<any>>) =>
		(tierData[i].vtubers = e.detail.items);
	const onVtuberClick = (i: number, j: number) => vtuberModal.toggleOpen(i, j);
	const onVtuberDelete = (i: number, j: number) =>
		(tierData[i].vtubers = tierData[i].vtubers.filter((_, k) => k !== j));
</script>

<div class="grid gap-4">
	<div
		class="grid"
		use:dndzone={{ items: tierData, type: 'tier', dropTargetStyle: { outline: '' } }}
		on:consider={onTierMove}
		on:finalize={onTierMove}
	>
		{#each tierData as d, i (d.id)}
			<div
				class="group/tier flex gap-1 border border-border bg-card dark:border-border-dark dark:bg-card-dark"
			>
				<button
					class="{d.color} {d.size} min-h-24 h-full w-24 items-center justify-center break-all p-1 font-bold"
					on:click={() => onTierClick(i)}
				>
					{d.label}
				</button>
				<div
					class="flex w-full flex-wrap gap-1"
					use:dndzone={{ items: d.vtubers, dropTargetStyle: { outline: '' } }}
					on:consider={(e) => onVtuberMove(i, e)}
					on:finalize={(e) => onVtuberMove(i, e)}
				>
					{#each d.vtubers as vtuber, j (vtuber.id)}
						<TierListGrid
							name={vtuber.name}
							image={vtuber.image}
							isShadowItem={vtuber[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
							class="w-24 text-sm"
							on:click={() => onVtuberClick(i, j)}
							on:delete={() => onVtuberDelete(i, j)}
						/>
					{/each}
				</div>
				<IconButton
					class="rounded-none p-2 opacity-0 group-hover/tier:opacity-100"
					title="delete"
					on:click={() => onTierDelete(i)}
				>
					<XmarkIcon class="h-5 w-5" />
				</IconButton>
			</div>
		{/each}
	</div>
	<Button class="px-4 py-2 font-bold" on:click={() => onTierClick(-1)}>Add New Tier</Button>
</div>

<TierListVtuberEditModal bind:this={vtuberModal} bind:data={tierData} />
<TierListTierModal bind:this={tierModal} bind:data={tierData} />
