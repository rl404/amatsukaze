<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	export let placeholder: string = '';
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ enter: never }>();

	const onEnter = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		dispatch('enter');
	};
</script>

<input
	type="text"
	{placeholder}
	bind:value
	class="{className} p-1 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-600 focus:outline-none focus:border-pink-500 focus:dark:border-indigo-600 rounded-lg"
	on:keypress={onEnter}
/>
