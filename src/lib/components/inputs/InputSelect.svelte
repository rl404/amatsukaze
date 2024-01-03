<script lang="ts">
	import type { SelectOption } from '$lib/types';

	export let value: string;
	export let options: SelectOption[];
	export { className as class };
	let className: string = '';
</script>

<select class={className} bind:value>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
