<script lang="ts">
	import GridIcon from '$lib/components/icons/GridIcon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import type { AgencyLayout } from '$lib/types';
	import type { Component } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: AgencyLayout;

	const layouts: { value: AgencyLayout; icon: Component }[] = [
		{ value: 'grid', icon: GridIcon },
		{ value: 'list', icon: ListIcon }
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
