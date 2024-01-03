<script lang="ts">
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte';
	import type { ComponentType } from 'svelte';

	export let title: string;
	export let icon: ComponentType | undefined;
	export let open: boolean = false;

	const toggleOpen = () => (open = !open);
</script>

<section class="border-border dark:border-border-dark rounded-lg border">
	<button
		class="{!open
			? 'rounded-lg'
			: 'rounded-t-lg border-b dark:border-neutral-600'} flex w-full items-center justify-between gap-2 bg-neutral-100 px-4 py-2 hover:bg-neutral-50 dark:bg-neutral-800 hover:dark:bg-neutral-700"
		on:click={toggleOpen}
	>
		<div class="flex items-center gap-2">
			{#if icon}
				<svelte:component this={icon} class="h-5 w-5" />
			{/if}
			<h2 class="text-xl font-bold">
				{title}
			</h2>
		</div>
		<div>
			{#if open}
				<ChevronUpIcon class="h-5 w-5" />
			{:else}
				<ChevronDownIcon class="h-5 w-5" />
			{/if}
		</div>
	</button>
	<div class="p-4" class:hidden={!open}>
		<slot />
	</div>
</section>
