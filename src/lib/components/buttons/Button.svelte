<script lang="ts">
	export let color: boolean = false;
	export let disabled: boolean = false;
</script>

<button
	on:click
	type="button"
	{disabled}
	class="{color
		? `bg-pink-500 dark:bg-indigo-600 text-white`
		: `bg-neutral-200 dark:bg-neutral-600`} disabled:opacity-70 font-medium hover:opacity-70 p-1 rounded-lg px-4 py-2 text-center inline-flex items-center gap-2"
	><slot /></button
>
