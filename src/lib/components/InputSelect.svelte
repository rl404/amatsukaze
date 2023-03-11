<script lang="ts">
	export let id: string = '';
	export let value: string = '';
	export let options: Array<{ value: string; label: string; selected?: boolean }> = [];
	export { className as class };
	let className: string = '';
</script>

<select
	{id}
	class="{className} p-1 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-600 focus:outline focus:outline-2 focus:outline-pink-500 focus:dark:outline-indigo-600 rounded-lg"
	bind:value
>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
