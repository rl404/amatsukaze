<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SortLetterAscIcon from '$lib/components/icons/SortLetterAscIcon.svelte';
	import SortLetterDescIcon from '$lib/components/icons/SortLetterDescIcon.svelte';
	import InputRadio from '$lib/components/inputs/InputRadio.svelte';
	import { clickAway } from '$lib/utils';
	import { createEventDispatcher, type ComponentType } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: never }>();

	export let value: string;

	const sorts: { [key: string]: { label: string; value: string; component: ComponentType } } = {
		name: { label: 'Name ASC', value: 'name', component: SortLetterAscIcon },
		'-name': { label: 'Name DESC', value: '-name', component: SortLetterDescIcon }
	};

	let hidden: boolean = true;
	const toggle = () => {
		hidden = !hidden;
	};

	const onClickAway = () => {
		hidden = true;
	};

	const onSubmit = () => {
		hidden = true;
		dispatch('submit');
	};
</script>

<div class="relative" use:clickAway on:clickAway={onClickAway}>
	<IconButton title={sorts[value].label} on:click={toggle}>
		<svelte:component this={sorts[value].component} class="w-5 h-5" />
	</IconButton>

	{#if !hidden}
		<div
			class="absolute mt-2 -right-10 grid grid-cols-1 gap-2 z-10 p-2 rounded-lg bg-white dark:bg-neutral-800 border dark:border-neutral-600 text-sm w-max"
		>
			{#each Object.values(sorts) as sort}
				<InputRadio label={sort.label} value={sort.value} bind:group={value} on:change={onSubmit} />
			{/each}
		</div>
	{/if}
</div>
