<script lang="ts">
	import { monthNames } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	let options: Array<{ label: string; value: string }> = monthNames.map((m, i) => ({
		label: m,
		value: (i + 1).toString()
	}));

	const dispatch = createEventDispatcher<{ change: never }>();

	const onChange = () => {
		dispatch('change');
	};
</script>

<select bind:value on:change={onChange} class="bg-white dark:bg-neutral-900 pr-2 hover:opacity-70">
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
