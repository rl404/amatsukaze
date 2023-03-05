<script lang="ts">
	import InputText from '$lib/components/InputText.svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	export let placeholder: string = '';
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ submit: never }>();

	const resetValue = () => {
		value = '';
		onSubmit();
	};

	const onSubmit = () => {
		dispatch('submit');
	};
</script>

<div class="relative">
	<div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
		</svg>
	</div>

	{#if value !== ''}
		<div class="absolute inset-y-0 right-0 flex items-center pr-2 hover:text-red-500" title="clear search" on:click={resetValue}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>
	{/if}

	<InputText class="pl-9 pr-9 {className}" bind:value {placeholder} on:enter={onSubmit} />
</div>
