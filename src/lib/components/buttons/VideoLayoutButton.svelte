<script lang="ts">
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import type { VideoLayout } from '$lib/types';
	import type { ComponentType } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let value: string;
	export { className as class };

	let className: string = '';

	const layouts: { name: VideoLayout; component: ComponentType }[] = [
		{ name: 'grid', component: Grid1Icon },
		{ name: 'list', component: ListIcon }
	];

	let layoutIndex: number = layouts.findIndex((l) => l.name === value);

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
