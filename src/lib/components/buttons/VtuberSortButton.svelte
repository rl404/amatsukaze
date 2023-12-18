<script lang="ts">
	import SortLetterAscIcon from '$lib/components/icons/SortLetterAscIcon.svelte';
	import SortLetterDescIcon from '$lib/components/icons/SortLetterDescIcon.svelte';
	import SortNumberAscIcon from '$lib/components/icons/SortNumberAscIcon.svelte';
	import SortNumberDescIcon from '$lib/components/icons/SortNumberDescIcon.svelte';
	import InputRadio from '$lib/components/inputs/InputRadio.svelte';
	import type { VtuberSort } from '$lib/types';
	import { clickAway } from '$lib/utils/utils';
	import { createEventDispatcher, type ComponentType } from 'svelte';
	import IconButton from './IconButton.svelte';

	const dispatch = createEventDispatcher<{ change: null }>();

	export let value: VtuberSort;
	export let hideKeys: VtuberSort[] = [];
	export { className as class };

	const sorts: {
		[key in VtuberSort]: {
			label: string;
			value: string;
			component: ComponentType;
			hidden: boolean;
		};
	} = {
		name: {
			label: 'Name ASC',
			value: 'name',
			component: SortLetterAscIcon,
			hidden: hideKeys.includes('name')
		},
		'-name': {
			label: 'Name DESC',
			value: '-name',
			component: SortLetterDescIcon,
			hidden: hideKeys.includes('-name')
		},
		subscriber: {
			label: 'Subscriber ASC',
			value: 'subscriber',
			component: SortNumberAscIcon,
			hidden: hideKeys.includes('subscriber')
		},
		'-subscriber': {
			label: 'Subscriber DESC',
			value: '-subscriber',
			component: SortNumberDescIcon,
			hidden: hideKeys.includes('-subscriber')
		},
		debut_date: {
			label: 'Debut date ASC',
			value: 'debut_date',
			component: SortNumberAscIcon,
			hidden: hideKeys.includes('debut_date')
		},
		'-debut_date': {
			label: 'Debut date DESC',
			value: '-debut_date',
			component: SortNumberDescIcon,
			hidden: hideKeys.includes('-debut_date')
		},
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
				{#if !sort.hidden}
					<InputRadio
						label={sort.label}
						value={sort.value}
						bind:group={value}
						on:change={onChange}
					/>
				{/if}
			{/each}
		</div>
	{/if}
</div>
