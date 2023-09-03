<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import XmarkIcon from '../icons/XmarkIcon.svelte';

	export let id: string = '';
	export let value: string = '';
	export let placeholder: string = '';
	export let datalist: Array<string> = [];
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ enter: null; reset: null }>();

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
			<XmarkIcon class="w-5 h-5" />
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
