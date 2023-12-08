<script lang="ts">
	export let id: string = '';
	export let value: string = '';
	export let rows: number = 3;
	export let placeholder: string = '';
	export { className as class };
	let className: string = '';
</script>

<textarea
	{id}
	{rows}
	{placeholder}
	class="{className} p-1 pr-9 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-600 focus:outline focus:outline-2 focus:outline-pink-500 focus:dark:outline-indigo-600 rounded-lg"
	bind:value
/>
