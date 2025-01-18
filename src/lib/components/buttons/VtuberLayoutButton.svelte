<script lang="ts">
	import type { VtuberLayout } from '$lib/types';
	import { createEventDispatcher, type Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ChartBarIcon from '../icons/ChartBarIcon.svelte';
	import Grid2Icon from '../icons/Grid2Icon.svelte';
	import GridIcon from '../icons/GridIcon.svelte';
	import ListIcon from '../icons/ListIcon.svelte';
	import TimelineIcon from '../icons/TimelineIcon.svelte';

	const dispatch = createEventDispatcher<{ change: VtuberLayout }>();

	export let value: VtuberLayout;
	export let timeline: boolean = false;
	export let barChart: boolean = false;

	const layouts: { value: VtuberLayout; icon: Component; class?: string }[] = [
		{ value: 'timeline', icon: TimelineIcon, class: timeline ? '' : 'hidden' },
		{ value: 'bar_chart', icon: ChartBarIcon, class: barChart ? '' : 'hidden' },
		{ value: 'grid', icon: GridIcon },
		{ value: 'card', icon: Grid2Icon },
		{ value: 'list', icon: ListIcon, class: 'hidden sm:block' }
	];

	const onClick = (v: VtuberLayout) => {
		value = v;
		dispatch('change', v);
	};
</script>

<div class="flex items-center justify-center gap-2">
	{#each layouts as layout}
		<button on:click={() => onClick(layout.value)} class={layout.class}>
			<svelte:component
				this={layout.icon}
				class={twMerge(
					'size-4 transition hover:text-primary',
					layout.value === value && 'text-primary'
				)}
			/>
		</button>
	{/each}
</div>
