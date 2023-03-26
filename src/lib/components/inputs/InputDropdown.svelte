<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	export let options: Array<{ label: string; value: string }> = [];
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ change: never }>();

	const onChange = () => {
		dispatch('change');
	};
</script>

<select
	bind:value
	on:change={onChange}
	class="{className} w-full p-1.5 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-600 focus:outline focus:outline-2 focus:outline-pink-500 focus:dark:outline-indigo-600 rounded-lg"
>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
