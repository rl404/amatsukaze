<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string = '';
	export let value: string = '';
	export let placeholder: string = '';
	export let datalist: Array<string> = [];
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ enter: never; reset: never }>();

	const onEnter = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		dispatch('enter');
	};

	const resetValue = () => {
		value = '';
		dispatch('reset');
	};
</script>

<div class="relative">
	{#if value !== ''}
		<div class="absolute inset-y-0 right-0 flex items-center pr-2 hover:text-red-500 cursor-pointer" title="clear search" on:click={resetValue}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>
	{/if}

	<input
		{id}
		{placeholder}
		type="text"
		list="datalist-{id}"
		class="{className} p-1 pr-9 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-600 focus:outline focus:outline-2 focus:outline-pink-500 focus:dark:outline-indigo-600 rounded-lg"
		bind:value
		on:keypress={onEnter}
	/>
</div>

<datalist id="datalist-{id}">
	{#each datalist as v}
		<option>{v}</option>
	{/each}
</datalist>
