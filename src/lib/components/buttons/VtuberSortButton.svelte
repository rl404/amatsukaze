<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SortLetterAscIcon from '$lib/components/icons/SortLetterAscIcon.svelte';
	import SortLetterDescIcon from '$lib/components/icons/SortLetterDescIcon.svelte';
	import SortNumberAscIcon from '$lib/components/icons/SortNumberAscIcon.svelte';
	import SortNumberDescIcon from '$lib/components/icons/SortNumberDescIcon.svelte';
	import InputRadio from '$lib/components/inputs/InputRadio.svelte';
	import { clickAway } from '$lib/utils';
	import { createEventDispatcher, type ComponentType } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: null }>();

	export let value: string;

	export { className as class };
	let className: string = '';

	export let hideKeys: Array<string> = [];

	let sorts: { [key: string]: { label: string; value: string; component: ComponentType; hidden: boolean } } = {};

	$: sorts = {
		name: { label: 'Name ASC', value: 'name', component: SortLetterAscIcon, hidden: hideKeys.includes('name') },
		'-name': { label: 'Name DESC', value: '-name', component: SortLetterDescIcon, hidden: hideKeys.includes('-name') },
		subscriber: { label: 'Subscriber ASC', value: 'subscriber', component: SortNumberAscIcon, hidden: hideKeys.includes('subscriber') },
		'-subscriber': { label: 'Subscriber DESC', value: '-subscriber', component: SortNumberDescIcon, hidden: hideKeys.includes('-subscriber') },
		debut_date: { label: 'Debut date ASC', value: 'debut_date', component: SortNumberAscIcon, hidden: hideKeys.includes('debut_date') },
		'-debut_date': { label: 'Debut date DESC', value: '-debut_date', component: SortNumberDescIcon, hidden: hideKeys.includes('-debut_date') },
		retirement_date: {
			label: 'Retirement date ASC',
			value: 'retirement_date',
			component: SortNumberAscIcon,
			hidden: hideKeys.includes('retirement_date')
		},
		'-retirement_date': {
			label: 'Retirement date DESC',
			value: '-retirement_date',
			component: SortNumberDescIcon,
			hidden: hideKeys.includes('-retirement_date')
		}
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
		<svelte:component this={sorts[value].component} class={className} />
	</IconButton>

	{#if !hidden}
		<div
			class="absolute mt-2 -right-10 grid grid-cols-1 gap-2 z-10 p-2 rounded-lg bg-white dark:bg-neutral-800 border dark:border-neutral-600 text-sm w-max"
		>
			{#each Object.values(sorts) as sort}
				{#if !sort.hidden}
					<InputRadio label={sort.label} value={sort.value} bind:group={value} on:change={onSubmit} />
				{/if}
			{/each}
		</div>
	{/if}
</div>
