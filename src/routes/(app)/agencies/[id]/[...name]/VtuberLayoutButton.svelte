<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import Grid2Icon from '$lib/components/icons/Grid2Icon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import TimelineIcon from '$lib/components/icons/TimelineIcon.svelte';
	import type { VtuberLayout, VtuberSort } from '$lib/types';
	import type { ComponentType } from 'svelte';

	export let value: VtuberLayout;
	export let sort: VtuberSort;

	const layouts: { name: VtuberLayout; component: ComponentType }[] = [
		{ name: 'timeline', component: TimelineIcon },
		{ name: 'grid', component: Grid1Icon },
		{ name: 'card', component: Grid2Icon },
		{ name: 'list', component: ListIcon }
	];

	let layoutIndex: number = 0;

	const nextLayout = () => {
		layoutIndex = (layoutIndex + 1) % layouts.length;
		value = layouts[layoutIndex].name;
		if (value === 'timeline') sort = 'debut_date';
	};
</script>

{#each layouts as l, i}
	{#if i === layoutIndex}
		<IconButton title={l.name + ' layout'} on:click={nextLayout} class="p-1.5">
			<svelte:component this={l.component} class="h-4 w-4" />
		</IconButton>
	{/if}
{/each}
