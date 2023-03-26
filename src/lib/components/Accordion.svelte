<script lang="ts">
	import type { ComponentType } from 'svelte';
	import ChevronDownIcon from './icons/ChevronDownIcon.svelte';
	import ChevronUpIcon from './icons/ChevronUpIcon.svelte';

	export let title: string;
	export let icon: ComponentType | undefined = undefined;
	export let open: boolean = false;

	const toggleOpen = () => {
		open = !open;
	};
</script>

<div class="rounded-lg border dark:border-neutral-600">
	<button
		class="w-full px-4 py-2 flex items-center justify-between gap-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-50 hover:dark:bg-neutral-700 {!open
			? 'rounded-lg'
			: 'rounded-t-lg border-b dark:border-neutral-600'}"
		on:click={toggleOpen}
	>
		<span class="text-xl font-bold flex items-center gap-2">
			{#if icon}
				<svelte:component this={icon} class="w-5 h-5" />
			{/if}
			<span>{title}</span>
		</span>
		<span>
			{#if open}
				<ChevronUpIcon class="w-5 h-5" />
			{:else}
				<ChevronDownIcon class="w-5 h-5" />
			{/if}
		</span>
	</button>
	<div class="p-4" hidden={!open}>
		<slot />
	</div>
</div>
