<script lang="ts">
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ enter: null; reset: null }>();

	export let id: string = '';
	export let value: string;
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let datalist: string[] = [];
	export { className as class };

	let className: string = '';

	const onKeyPress = (e: KeyboardEvent) => e.key === 'Enter' && dispatch('enter');

	const resetValue = () => {
		value = '';
		dispatch('reset');
	};
</script>

<div class="relative">
	<input
		{id}
		{placeholder}
		{disabled}
		type="text"
		list="datalist-{id}"
		class={className}
		bind:value
		on:keypress={onKeyPress}
	/>
	{#if value !== ''}
		<button
			class="clickable absolute inset-y-0 right-2 flex items-center"
			title="clear"
			on:click={resetValue}
		>
			<XmarkIcon class="h-4 w-4" />
		</button>
	{/if}
</div>

<datalist id="datalist-{id}">
	{#each datalist as data}
		<option>{data}</option>
	{/each}
</datalist>
