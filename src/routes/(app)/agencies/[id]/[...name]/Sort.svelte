<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SortLetterAscIcon from '$lib/components/icons/SortLetterAscIcon.svelte';
	import SortLetterDescIcon from '$lib/components/icons/SortLetterDescIcon.svelte';
	import SortNumberAscIcon from '$lib/components/icons/SortNumberAscIcon.svelte';
	import SortNumberDescIcon from '$lib/components/icons/SortNumberDescIcon.svelte';
	import InputRadio from '$lib/components/inputs/InputRadio.svelte';
	import { clickAway } from '$lib/utils';
	import type { ComponentType } from 'svelte';

	export let value: string;
	export let layout: string;

	let sorts: { [key: string]: { label: string; value: string; component: ComponentType; hidden: boolean } };

	$: layout,
		(sorts = {
			name: { label: 'Name ASC', value: 'name', component: SortLetterAscIcon, hidden: layout === 'timeline' },
			'-name': { label: 'Name DESC', value: '-name', component: SortLetterDescIcon, hidden: layout === 'timeline' },
			debut_date: { label: 'Debut date ASC', value: 'debut_date', component: SortNumberAscIcon, hidden: false },
			'-debut_date': { label: 'Debut date DESC', value: '-debut_date', component: SortNumberDescIcon, hidden: false },
			retirement_date: { label: 'Retirement date ASC', value: 'retirement_date', component: SortNumberAscIcon, hidden: false },
			'-retirement_date': { label: 'Retirement date DESC', value: '-retirement_date', component: SortNumberDescIcon, hidden: false }
		});

	let hidden: boolean = true;
	const toggle = () => {
		hidden = !hidden;
	};

	const onClickAway = () => {
		hidden = true;
	};
</script>

<div class="relative" use:clickAway on:clickAway={onClickAway}>
	<IconButton title={sorts[value].label} on:click={toggle}>
		<svelte:component this={sorts[value].component} class="w-4 h-4" />
	</IconButton>

	{#if !hidden}
		<div
			class="absolute mt-2 -right-10 grid grid-cols-1 gap-2 z-10 p-2 rounded-lg bg-white dark:bg-neutral-800 border dark:border-neutral-600 text-sm w-max"
		>
			{#each Object.values(sorts) as sort}
				{#if !sort.hidden}
					<InputRadio label={sort.label} value={sort.value} bind:group={value} on:change={toggle} />
				{/if}
			{/each}
		</div>
	{/if}
</div>
