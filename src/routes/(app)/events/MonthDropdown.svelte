<script lang="ts">
	import type { SelectOption } from '$lib/types';
	import { MonthNames } from '$lib/utils/const';

	export let value: string;

	const options: SelectOption[] = MonthNames.map((m, i) => ({
		label: m,
		value: (i + 1).toString()
	}));
</script>

<select bind:value on:change class="">
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
