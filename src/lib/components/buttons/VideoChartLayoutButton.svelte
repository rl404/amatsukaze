<script lang="ts">
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import TimelineIcon from '$lib/components/icons/TimelineIcon.svelte';
	import type { VideoChartLayout } from '$lib/types';
	import type { ComponentType } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let value: string;
	export { className as class };

	const layouts: { name: VideoChartLayout; component: ComponentType }[] = [
		{ name: 'heatmap', component: Grid1Icon },
		{ name: 'timeline', component: TimelineIcon }
	];

	let className: string = '';
	let layoutIndex: number = 0;

	const nextLayout = () => {
		layoutIndex = (layoutIndex + 1) % layouts.length;
		value = layouts[layoutIndex].name;
	};
</script>

{#each layouts as l, i}
	{#if i === layoutIndex}
		<IconButton title={l.name + ' layout'} on:click={nextLayout} class="p-1.5">
			<svelte:component this={l.component} class={className} />
		</IconButton>
	{/if}
{/each}
