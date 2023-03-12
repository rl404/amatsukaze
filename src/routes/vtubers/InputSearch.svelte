<script lang="ts">
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	export let placeholder: string = '';
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ submit: never }>();

	const onSubmit = () => {
		dispatch('submit');
	};
</script>

<div class="relative">
	<div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none z-10">
		<SearchIcon class="w-4 h-4" />
	</div>

	<InputText class="pl-9 {className}" bind:value {placeholder} on:enter={onSubmit} on:reset={onSubmit} />
</div>
