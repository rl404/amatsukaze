<script lang="ts">
	import SortLetterAscIcon from '$lib/components/icons/SortLetterAscIcon.svelte';
	import SortLetterDescIcon from '$lib/components/icons/SortLetterDescIcon.svelte';
	import SortNumberAscIcon from '$lib/components/icons/SortNumberAscIcon.svelte';
	import SortNumberDescIcon from '$lib/components/icons/SortNumberDescIcon.svelte';
	import InputRadio from '$lib/components/inputs/InputRadio.svelte';
	import type { AgencySort } from '$lib/types';
	import { clickAway } from '$lib/utils/utils';
	import type { ComponentType } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let value: AgencySort;
	export { className as class };

	const sorts: { [key in AgencySort]: { label: string; value: string; component: ComponentType } } =
		{
			name: { label: 'Name ASC', value: 'name', component: SortLetterAscIcon },
			'-name': { label: 'Name DESC', value: '-name', component: SortLetterDescIcon },
			member: { label: 'Member ASC', value: 'member', component: SortNumberAscIcon },
			'-member': { label: 'Member DESC', value: '-member', component: SortNumberDescIcon },
			subscriber: { label: 'Subscriber ASC', value: 'subscriber', component: SortNumberAscIcon },
			'-subscriber': {
				label: 'Subscriber DESC',
				value: '-subscriber',
				component: SortNumberDescIcon
			}
		};

	let className: string = '';
	let open: boolean = false;

	const onClick = () => (open = !open);
	const onClose = () => (open = false);
</script>

<div class="relative" use:clickAway on:clickAway={onClose}>
	<IconButton title={sorts[value].label} on:click={onClick} class="p-1.5">
		<svelte:component this={sorts[value].component} class={className} />
	</IconButton>

	{#if open}
		<div
			class="absolute -right-10 z-10 mt-2 grid w-max gap-2 rounded-lg border border-border bg-body p-2 text-sm dark:border-border-dark dark:bg-body-dark"
		>
			{#each Object.values(sorts) as sort}
				<InputRadio label={sort.label} value={sort.value} bind:group={value} on:change={onClose} />
			{/each}
		</div>
	{/if}
</div>
