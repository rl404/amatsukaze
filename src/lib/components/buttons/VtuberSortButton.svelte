<script lang="ts">
	import type { VtuberSort } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import SortIcon from '../icons/SortIcon.svelte';

	const dispatch = createEventDispatcher<{ change: null }>();

	export let value: VtuberSort;
	export let hideKeys: VtuberSort[] = [];
	export { className as class };

	let className: string = '';
	let open: boolean = false;

	let sorts: {
		[key in VtuberSort]: {
			name: string;
			value: VtuberSort;
			hidden: boolean;
		};
	};

	$: sorts = {
		name: {
			name: 'Name ASC',
			value: 'name',
			hidden: hideKeys.includes('name')
		},
		'-name': {
			name: 'Name DESC',
			value: '-name',
			hidden: hideKeys.includes('-name')
		},
		subscriber: {
			name: 'Subscriber ASC',
			value: 'subscriber',
			hidden: hideKeys.includes('subscriber')
		},
		'-subscriber': {
			name: 'Subscriber DESC',
			value: '-subscriber',
			hidden: hideKeys.includes('-subscriber')
		},
		debut_date: {
			name: 'Debut date ASC',
			value: 'debut_date',
			hidden: hideKeys.includes('debut_date')
		},
		'-debut_date': {
			name: 'Debut date DESC',
			value: '-debut_date',
			hidden: hideKeys.includes('-debut_date')
		},
		retirement_date: {
			name: 'Retirement date ASC',
			value: 'retirement_date',
			hidden: hideKeys.includes('retirement_date')
		},
		'-retirement_date': {
			name: 'Retirement date DESC',
			value: '-retirement_date',
			hidden: hideKeys.includes('-retirement_date')
		},
		video_count: {
			name: 'Video count ASC',
			value: 'video_count',
			hidden: hideKeys.includes('video_count')
		},
		'-video_count': {
			name: 'Video count DESC',
			value: '-video_count',
			hidden: hideKeys.includes('-video_count')
		}
	};

	const onChange = (v: VtuberSort) => {
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
		{#if !sort.hidden}
			<DropdownItem on:click={() => onChange(sort.value)}>
				{sort.name}
			</DropdownItem>
		{/if}
	{/each}
</Dropdown>
