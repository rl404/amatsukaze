<script lang="ts">
	import type { AgencySort } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import SortIcon from '../icons/SortIcon.svelte';

	const dispatch = createEventDispatcher<{ change: null }>();

	export let value: AgencySort;
	export { className as class };

	let className: string = '';
	let open: boolean = false;

	const sorts: {
		[key in AgencySort]: {
			name: string;
			value: AgencySort;
		};
	} = {
		name: { name: 'Name ASC', value: 'name' },
		'-name': { name: 'Name DESC', value: '-name' },
		member: { name: 'Member ASC', value: 'member' },
		'-member': { name: 'Member DESC', value: '-member' },
		subscriber: { name: 'Subscriber ASC', value: 'subscriber' },
		'-subscriber': { name: 'Subscriber DESC', value: '-subscriber' }
	};

	const onChange = (v: AgencySort) => {
		value = v;
		dispatch('change');
		open = false;
	};
</script>

<button
	class={twMerge(
		'flex items-center gap-1 whitespace-nowrap text-sm transition hover:text-primary',
		className
	)}
>
	<SortIcon class="size-3" />
	{sorts[value].name}
</button>
<Dropdown bind:open>
	{#each Object.values(sorts) as sort}
		<DropdownItem on:click={() => onChange(sort.value)}>{sort.name}</DropdownItem>
	{/each}
</Dropdown>
