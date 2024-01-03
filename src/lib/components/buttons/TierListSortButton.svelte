<script lang="ts">
	import SortLetterAscIcon from '$lib/components/icons/SortLetterAscIcon.svelte';
	import SortLetterDescIcon from '$lib/components/icons/SortLetterDescIcon.svelte';
	import SortNumberAscIcon from '$lib/components/icons/SortNumberAscIcon.svelte';
	import SortNumberDescIcon from '$lib/components/icons/SortNumberDescIcon.svelte';
	import InputRadio from '$lib/components/inputs/InputRadio.svelte';
	import type { TierListSort } from '$lib/types';
	import { clickAway } from '$lib/utils/utils';
	import { createEventDispatcher, type ComponentType } from 'svelte';
	import IconButton from './IconButton.svelte';

	const dispatch = createEventDispatcher<{ change: null }>();

	export let value: TierListSort;
	export { className as class };

	const sorts: {
		[key in TierListSort]: { label: string; value: string; component: ComponentType };
	} = {
		title: { label: 'Title ASC', value: 'title', component: SortLetterAscIcon },
		'-title': { label: 'Title DESC', value: '-title', component: SortLetterDescIcon },
		updated_at: { label: 'Updated ASC', value: 'updated_at', component: SortNumberAscIcon },
		'-updated_at': { label: 'Updated DESC', value: '-updated_at', component: SortNumberDescIcon }
	};

	let className: string = '';
	let open: boolean = false;

	const onClick = () => (open = !open);
	const onClickAway = () => (open = false);

	const onChange = () => {
		dispatch('change');
		open = false;
	};
</script>

<div class="relative" use:clickAway on:clickAway={onClickAway}>
	<IconButton title={sorts[value].label} on:click={onClick} class="p-1.5">
		<svelte:component this={sorts[value].component} class={className} />
	</IconButton>

	{#if open}
		<div
			class="absolute -right-10 z-10 mt-2 grid w-max gap-2 rounded-lg border border-border bg-body p-2 text-sm dark:border-border-dark dark:bg-body-dark"
		>
			{#each Object.values(sorts) as sort}
				<InputRadio label={sort.label} value={sort.value} bind:group={value} on:change={onChange} />
			{/each}
		</div>
	{/if}
</div>
