<script lang="ts">
	import SortIcon from '$lib/components/icons/SortIcon.svelte';
	import type { AgencySort } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: AgencySort;
	export let onChange: () => void = () => {};

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

	const onClick = (v: AgencySort) => {
		value = v;
		onChange();
		open = false;
	};
</script>

<button
	class={twMerge(
		'hover:text-primary flex items-center gap-1 text-sm whitespace-nowrap transition',
		$$props.class
	)}
>
	<SortIcon class="size-3" />
	{sorts[value].name}
</button>
<Dropdown bind:isOpen={open} simple transitionParams={{ duration: 0 }}>
	{#each Object.values(sorts) as sort}
		<DropdownItem class="w-full text-left" onclick={() => onClick(sort.value)}>
			{sort.name}
		</DropdownItem>
	{/each}
</Dropdown>
