<script lang="ts">
	import type { AgencyLayout } from '$lib/types';
	import type { ComponentType } from 'svelte';
	import GridIcon from '../icons/GridIcon.svelte';
	import ListIcon from '../icons/ListIcon.svelte';

	export let value: AgencyLayout;

	const layouts: { value: AgencyLayout; icon: ComponentType }[] = [
		{ value: 'grid', icon: GridIcon },
		{ value: 'list', icon: ListIcon }
	];
</script>

<div class="flex items-center justify-center gap-2">
	{#each layouts as layout}
		<button on:click={() => (value = layout.value)}>
			<svelte:component this={layout.icon} class="size-4 transition hover:text-primary" />
		</button>
	{/each}
</div>
