<script lang="ts">
	export let title = '';
	export { className as class };
	let className: string = '';
</script>

<button
	class="bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg p-1.5 inline-flex items-center {className}"
	type="button"
	{title}
	on:click
>
	<slot />
</button>
