<script lang="ts">
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import Grid2Icon from '$lib/components/icons/Grid2Icon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import type { VtuberLayout } from '$lib/types';
	import type { ComponentType } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let value: VtuberLayout;
	export { className as class };

	const layouts: { name: VtuberLayout; component: ComponentType }[] = [
		{ name: 'grid', component: Grid1Icon },
		{ name: 'card', component: Grid2Icon },
		{ name: 'list', component: ListIcon }
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
