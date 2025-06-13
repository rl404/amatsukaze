<script lang="ts">
	import ChartBarIcon from '$lib/components/icons/ChartBarIcon.svelte';
	import Grid2Icon from '$lib/components/icons/Grid2Icon.svelte';
	import GridIcon from '$lib/components/icons/GridIcon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import TimelineIcon from '$lib/components/icons/TimelineIcon.svelte';
	import type { VtuberLayout } from '$lib/types';
	import { type Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: VtuberLayout;
	export let timeline: boolean = false;
	export let barChart: boolean = false;
	export let onChange: (data: VtuberLayout) => void = () => {};

	const layouts: { value: VtuberLayout; icon: Component; class?: string }[] = [
		{ value: 'timeline', icon: TimelineIcon, class: timeline ? '' : 'hidden' },
		{ value: 'bar_chart', icon: ChartBarIcon, class: barChart ? '' : 'hidden' },
		{ value: 'grid', icon: GridIcon },
		{ value: 'card', icon: Grid2Icon },
		{ value: 'list', icon: ListIcon, class: 'hidden sm:block' }
	];

	const onClick = (v: VtuberLayout) => {
		value = v;
		onChange(v);
	};
</script>

<div class="flex items-center justify-center gap-2">
	{#each layouts as layout}
		<button onclick={() => onClick(layout.value)} class={layout.class}>
			<svelte:component
				this={layout.icon}
				class={twMerge(
					'hover:text-primary size-4 transition',
					layout.value === value && 'text-primary'
				)}
			/>
		</button>
	{/each}
</div>
