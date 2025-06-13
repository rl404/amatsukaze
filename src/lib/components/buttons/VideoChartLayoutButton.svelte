<script lang="ts">
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import GridIcon from '$lib/components/icons/GridIcon.svelte';
	import type { VideoChartLayout } from '$lib/types';
	import type { Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: VideoChartLayout;

	const layouts: { value: VideoChartLayout; icon: Component }[] = [
		{ value: 'calendar', icon: CalendarIcon },
		{ value: 'hourly', icon: GridIcon }
	];
</script>

<div class="flex items-center justify-center gap-2">
	{#each layouts as layout}
		<button onclick={() => (value = layout.value)}>
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
