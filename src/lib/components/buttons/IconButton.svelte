<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title = '';
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ click: never }>();

	const onClick = () => {
		dispatch('click');
	};
</script>

<button
	class="bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg p-1.5 inline-flex items-center {className}"
	type="button"
	{title}
	on:click={onClick}
>
	<slot />
</button>
