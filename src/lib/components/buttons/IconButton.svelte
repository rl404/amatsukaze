<script lang="ts">
	export let title = '';
	export { className as class };
	let className: string = '';
</script>

<button
	on:click
	{title}
	class="{className} flex items-center rounded-lg hover:bg-border dark:hover:bg-border-dark"
>
	<slot />
</button>
