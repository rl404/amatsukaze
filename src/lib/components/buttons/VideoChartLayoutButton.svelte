<script lang="ts">
	import type { VideoChartLayout } from '$lib/types';
	import type { Component } from 'svelte';
	import CalendarIcon from '../icons/CalendarIcon.svelte';
	import GridIcon from '../icons/GridIcon.svelte';

	export let value: VideoChartLayout;

	const layouts: { value: VideoChartLayout; icon: Component }[] = [
		{ value: 'calendar', icon: CalendarIcon },
		{ value: 'hourly', icon: GridIcon }
	];
</script>

<div class="flex items-center justify-center gap-2">
	{#each layouts as layout}
		<button on:click={() => (value = layout.value)}>
			<svelte:component this={layout.icon} class="size-4 transition hover:text-primary" />
		</button>
	{/each}
</div>
