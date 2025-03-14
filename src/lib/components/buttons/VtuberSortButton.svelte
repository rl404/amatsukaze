<script lang="ts">
	import type { VtuberSort } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import SortIcon from '../icons/SortIcon.svelte';

	export let value: VtuberSort;
	export let hideKeys: VtuberSort[] = [];
	export let onChange: (data: VtuberSort) => void = () => {};

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
		monthly_subscriber: {
			name: 'Monthly Subs ASC',
			value: 'monthly_subscriber',
			hidden: hideKeys.includes('monthly_subscriber')
		},
		'-monthly_subscriber': {
			name: 'Monthly Subs DESC',
			value: '-monthly_subscriber',
			hidden: hideKeys.includes('-monthly_subscriber')
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
		},
		average_video_length: {
			name: 'Average video length ASC',
			value: 'average_video_length',
			hidden: hideKeys.includes('average_video_length')
		},
		'-average_video_length': {
			name: 'Average video length DESC',
			value: '-average_video_length',
			hidden: hideKeys.includes('-average_video_length')
		},
		total_video_length: {
			name: 'Total video length ASC',
			value: 'total_video_length',
			hidden: hideKeys.includes('total_video_length')
		},
		'-total_video_length': {
			name: 'Total video length DESC',
			value: '-total_video_length',
			hidden: hideKeys.includes('-total_video_length')
		}
	};

	const onClick = (v: VtuberSort) => {
		value = v;
		onChange(v);
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
<Dropdown bind:open>
	{#each Object.values(sorts) as sort}
		{#if !sort.hidden}
			<DropdownItem onclick={() => onClick(sort.value)}>
				{sort.name}
			</DropdownItem>
		{/if}
	{/each}
</Dropdown>
