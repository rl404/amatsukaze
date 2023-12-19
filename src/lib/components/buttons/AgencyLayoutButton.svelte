<script lang="ts">
	import type { AgencyLayout } from '$lib/types';
	import type { ComponentType } from 'svelte';
	import Grid1Icon from '../icons/Grid1Icon.svelte';
	import ListIcon from '../icons/ListIcon.svelte';
	import IconButton from './IconButton.svelte';

	export let value: AgencyLayout;
	export { className as class };

	const layouts: { name: AgencyLayout; component: ComponentType }[] = [
		{ name: 'grid', component: Grid1Icon },
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
