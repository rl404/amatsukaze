<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let color: boolean = false;

	const dispatch = createEventDispatcher<{ click: null }>();

	const onClick = () => {
		dispatch('click');
	};
</script>

<button
	on:click={onClick}
	type="button"
	class="{color
		? `bg-pink-500 dark:bg-indigo-600 text-white`
		: `bg-neutral-200 dark:bg-neutral-600`} font-medium hover:opacity-70 p-1 rounded-lg px-4 py-2 text-center inline-flex items-center gap-2"
	><slot /></button
>
